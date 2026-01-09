import { GoogleGenAI } from "@google/genai";
import { Trade } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeTradeWithAI = async (trade: Trade): Promise<string> => {
  try {
    const ai = getClient();
    
    const prompt = `
      Действуй как профессиональный наставник по трейдингу. Проанализируй следующую сделку и дай конструктивную критику.
      
      Детали сделки:
      - Инструмент: ${trade.symbol}
      - Направление: ${trade.direction}
      - Вход: ${trade.entryPrice}
      - Выход: ${trade.exitPrice}
      - Размер позиции: ${trade.size}
      - PnL (Прибыль/Убыток): ${trade.pnl}
      - Дата: ${trade.date}
      - Заметки трейдера: "${trade.notes}"
      
      Пожалуйста, оцени:
      1. Качество исполнения (вход/выход).
      2. Психологический аспект (судя по заметкам).
      3. Риск-менеджмент.
      4. Дай 3 конкретных совета по улучшению.
      
      Ответ должен быть на русском языке, кратким и структурированным (Markdown).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Не удалось получить анализ от ИИ.";
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return "Ошибка при обращении к ИИ. Проверьте API ключ.";
  }
};

export const askGeneralTradingQuestion = async (question: string): Promise<string> => {
  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Ответь на вопрос трейдера кратко и по существу на русском языке: ${question}`,
    });
    return response.text || "Нет ответа.";
  } catch (error) {
    console.error("AI Chat Error:", error);
    return "Ошибка сервиса ИИ.";
  }
};