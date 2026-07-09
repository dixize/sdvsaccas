// Vercel Serverless Function: /api/send-telegram
// Токен и chat_id берутся из переменных окружения Vercel, а не из кода.
// Настроить: проект на vercel.com -> Settings -> Environment Variables -> добавить
//   BOT_TOKEN = токен твоего бота (из @BotFather)
//   CHAT_ID   = твой chat_id (5415190532)
// После добавления переменных нужен redeploy, чтобы они подхватились.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    return res.status(500).json({ error: "Server is not configured" });
  }

  try {
    const { text } = req.body || {};

    if (!text || typeof text !== "string" || text.length > 4000) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    const tgResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    });

    if (!tgResponse.ok) {
      return res.status(502).json({ error: "Telegram API error" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}
