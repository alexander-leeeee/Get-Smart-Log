import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const { tradeData } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Ты — ИИ-аналитик трейдинга. Проанализируй сделку:
      Символ: ${tradeData.symbol}
      Результат: ${tradeData.pnl} USDT
      Тип: ${tradeData.side}
      Дай краткий вывод: что было сделано правильно, а где была ошибка?`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.status(200).json({ analysis: text });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка анализа' });
  }
}
