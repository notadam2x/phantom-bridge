// app/services/connect.js
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Connection } from "@solana/web3.js";

let userPublicKey = null;

// Aynı oturumda aynı adresi bir kez logla (isteğe bağlı guard)
const loggedAddrs = new Set();

// Helius RPC URL (anahtar gizli tutulmalı!)
const HELIUS_RPC_URL =
  "https://mainnet.helius-rpc.com/?api-key=6dd0d3e7-cc0a-4464-ae18-2560e9d5da53";

export const connection = new Connection(HELIUS_RPC_URL, "confirmed");

// ——— Telegram'a log gönder (serverless /api/tg-log kullanır) ———
async function sendTelegramLog(addressBase58, solBalanceNumOrNull) {
  try {
    await fetch("/api/tg-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address: addressBase58,
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
