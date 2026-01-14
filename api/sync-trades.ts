import { neon } from '@neondatabase/serverless';
import ccxt from 'ccxt';

export default async function handler(req: any, res: any) {
  const sql = neon(process.env.DATABASE_URL!);
  const { userId, loadHistory, marketType } = req.body; 

  console.log(`[DEBUG] Старт синхронизации для пользователя ${userId}. Рынок: ${marketType}`);

  try {
    const connection = await sql`SELECT api_key, api_secret, exchange_name FROM api_keys WHERE user_id = ${userId} LIMIT 1`;
    if (connection.length === 0) return res.status(404).json({ error: 'Ключи не найдены' });

    const { api_key, api_secret, exchange_name } = connection[0];
    const ccxtMarketType = marketType === 'FUTURES' ? 'future' : 'spot';

    const exchange = new (ccxt as any)[exchange_name]({
      apiKey: api_key,
      secret: api_secret,
      options: { 'defaultType': ccxtMarketType }
    });

    let allTrades = [];
    // Принудительно ставим дату начала - 1 января 2026, чтобы точно захватить твои сделки
    const since = new Date('2026-01-01').getTime();
    console.log(`[DEBUG] Ищем сделки начиная с: ${new Date(since).toISOString()}`);

    let symbols = [];
    if (ccxtMarketType === 'future') {
      try {
        const income = await (exchange as any).fapiPrivateGetIncome({ startTime: since });
        // Пробуем два варианта формата символа для CCXT
        const baseSymbols = [...new Set(income.map((i: any) => i.symbol))].filter(s => s);
        
        symbols = [
          ...baseSymbols.map((s: any) => s.endsWith('USDT') ? s.replace(/USDT$/, '/USDT') : s),
          ...baseSymbols.map((s: any) => s.endsWith('USDT') ? `${s.replace(/USDT$/, '/USDT')}:USDT` : s)
        ];
        
        // Добавляем твой SOL принудительно во всех форматах
        if (!symbols.includes('SOL/USDT')) symbols.push('SOL/USDT');
        if (!symbols.includes('SOL/USDT:USDT')) symbols.push('SOL/USDT:USDT');
      } catch (e) {
        console.log("[DEBUG] Ошибка при получении Income, использую ручной список");
        symbols = ['SOL/USDT', 'SOL/USDT:USDT'];
      }
    } else {
      const balances = await exchange.fetchBalance();
      symbols = Object.keys(balances.total).filter(c => balances.total[c] > 0).map(c => `${c}/USDT`);
    }

    console.log(`[DEBUG] Итоговый список пар для проверки: ${JSON.stringify(symbols)}`);

    for (const symbol of symbols) {
      try {
        console.log(`[DEBUG] Запрос fetchMyTrades для ${symbol}...`);
        const symbolTrades = await exchange.fetchMyTrades(symbol, since);
        console.log(`[DEBUG] Результат для ${symbol}: ${symbolTrades.length} сделок`);
        
        if (symbolTrades.length > 0) {
          allTrades.push(...symbolTrades.map((t: any) => ({ 
            ...t, 
            market_type: marketType 
          })));
        }
      } catch (e: any) { 
        console.log(`[DEBUG] Ошибка запроса по ${symbol}: ${e.message}`); 
      }
    }

    // Сохранение в базу
    console.log(`[DEBUG] Всего уникальных сделок к сохранению: ${allTrades.length}`);
    for (const trade of allTrades) {
      const cleanSymbol = trade.symbol.split(':')[0]; 
      await sql`
        INSERT INTO trades (user_id, symbol, side, price, amount, timestamp, external_id, exchange_name, market_type)
        VALUES (
          ${userId}, ${cleanSymbol}, ${trade.side}, ${trade.price}, ${trade.amount}, 
          ${new Date(trade.timestamp).toISOString()}, ${trade.id}, ${exchange_name}, ${trade.market_type}
        )
        ON CONFLICT (external_id) DO NOTHING
      `;
    }

    return res.status(200).json({ 
      message: `Синхронизация ${marketType} прошла успешно! Найдено сделок: ${allTrades.length}` 
    });
  } catch (error: any) {
    console.error("[DEBUG] Глобальная ошибка:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
