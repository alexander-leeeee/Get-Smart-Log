import { Trade } from "../types";

/**
 * Универсальная функция для отправки запроса на ваш серверный эндпоинт.
 * Это защищает ваши API ключи от кражи.
 */
const callAIProvider = async (payload: { tradeData: any; aiProvider: 'GEMINI' | 'GPT' }) => {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Ошибка при ответе сервера');
    }

    const data = await response.json();
    return data.analysis || "Не удалось получить ответ от ИИ.";
  } catch (error) {
    console.error("AI Service Error:", error);
    return "Ошибка связи с ассистентом. Убедитесь, что сервер запущен и ключи прописаны в .env.local";
  }
};

/**
 * Глубокий анализ конкретной сделки из журнала.
 * Использует ваш подробный промпт для качественной критики.
 */
export const analyzeTradeWithAI = async (trade: Trade, provider: 'GEMINI' | 'GPT' = 'GEMINI'): Promise<string> => {
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

  return callAIProvider({ 
    tradeData: { text: prompt }, 
    aiProvider: provider 
  });
};

/**
 * Общие вопросы ассистенту в чате (стратегия, психология, советы).
 */
export const askGeneralTradingQuestion = async (question: string, provider: 'GEMINI' | 'GPT' = 'GEMINI'): Promise<string> => {
  return callAIProvider({ 
    tradeData: { text: question }, 
    aiProvider: provider 
  });
};
