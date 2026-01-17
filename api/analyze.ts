import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: any, res: any) {
  const { tradeData, modelType } = req.body; // Получаем тип модели из фронтенда

  try {
    const prompt = `Ты — эксперт-трейдер. Проанализируй сделку: ${tradeData.symbol}, PnL: ${tradeData.pnl} USDT...`;

    if (modelType === 'GPT') {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4o", // или gpt-4-turbo
      });
      return res.status(200).json({ analysis: completion.choices[0].message.content });
    } else {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      return res.status(200).json({ analysis: result.response.text() });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ошибка анализа' });
  }
}
