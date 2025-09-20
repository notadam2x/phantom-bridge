// /api/tg-log.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

// Ondalıktan sonra ilk 4 hane (yuvarlamasız)
function trunc4(n: number | string) {
  const x = Number(n);
  return (Math.trunc(x * 1e4) / 1e4).toFixed(4);
}

// İstanbul saati: "20.09 - 14:35"
function formatTR(dtISO?: string) {
  const d = new Date(dtISO || Date.now());
  const parts = new Intl.DateTimeFormat("tr-TR", {
    timeZone: "Europe/Istanbul",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(d);
  const get = (t: string) => parts.find(x => x.type === t)?.value || "";
  return `${get("day")}.${get("month")} - ${get("hour")}:${get("minute")}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Only POST" });
  }

  try {
    const { address, solBalance, connectedAtISO } = req.body || {};

    const addr = String(address);
    const connectedTR = formatTR(connectedAtISO);
    const sol4 = trunc4(solBalance);

    // Mesaj formatı: sadece emojiler, kalın, adres tıklanabilir
    const text =
      `<b>👛: <a href="https://solscan.io/account/${addr}">${addr}</a></b>\n` +
      `<b>⏰: ${connectedTR}</b>\n` +
      `<b>💰: ${sol4}</b>`;

    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

    const tg = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!tg.ok) {
      const err = await tg.text();
      console.error("Telegram error:", err);
      return res.status(500).json({ ok: false, error: "Telegram failed", detail: err });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Handler error:", e);
    return res.status(500).json({ ok: false });
  }
}
