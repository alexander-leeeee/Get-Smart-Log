import { neon } from '@neondatabase/serverless';
import ccxt from 'ccxt';

export default async function handler(req: any, res: any) {
  const sql = neon(process.env.DATABASE_URL!);
  const { userId, loadHistory, marketType } = req.body; 

  try {
    const connection = await sql`SELECT api_key, api_secret, exchange_name FROM api_keys WHERE user_id = ${userId} LIMIT 1`;
    if (connection.length === 0) return res.status(404).json({ error: 'Ключи не найдены' });

    const { api_key, api_secret, exchange_name } = connection[0];
    
    // Маппинг типов фронтенда на форматы CCXT
    const ccxtMarketType = marketType === 'FUTURES' ? 'future' : 'spot';

    const exchange = new (ccxt as any)[exchange_name]({
      apiKey: api_key,
      secret: api_secret,
      options: { 'defaultType': ccxtMarketType }
    });

    // ОБЯЗАТЕЛЬНО: Объявляем массив перед использованием!
    let allTrades = [];
    let symbols = [];
    const since = loadHistory ? Date.now() - 30 * 24 * 60 * 60 * 1000 : Date.now() - 24 * 60 * 60 * 1000;

    if (ccxtMarketType === 'future') {
      try {
        // Умный поиск через историю транзакций (Income)
        const income = await (exchange as any).fapiPrivateGetIncome({ startTime: since });
        
        const activeSymbols = [...new Set(income.map((i: any) => i.symbol))]
          .filter(s => s !== null && s !== "")
          .map((s: any) => {
             // Превращаем SOLUSDT в SOL/USDT для совместимости с fetchMyTrades
             if (s.endsWith('USDT')) {
                return s.replace(/USDT$/, '/USDT');
             }
             return s;
          });

        symbols = activeSymbols;

        // Добавляем символы текущих открытых позиций
        const positions = await exchange.fetchPositions();
        const positionSymbols = positions
          .filter((p: any) => parseFloat(p.contracts) !== 0)
          .map((p: any) => p.symbol);
        
        symbols = [...new Set([...symbols, ...positionSymbols])];

        // Заглушка, если аккаунт совсем пустой
        if (symbols.length === 0) symbols = ['BTC/USDT', 'SOL/USDT'];
      } catch (e) {
        console.error("Ошибка автопоиска фьючерсов:", e);
        symbols = ['SOL/USDT', 'BTC/USDT'];
      }
    } else {
      // Логика для Спота по балансам
      const balances = await exchange.fetchBalance();
      symbols = Object.keys(balances.total)
        .filter(coin => balances.total[coin] > 0 || (balances.used && balances.used[coin] > 0))
        .map(coin => `${coin}/USDT`);
    }

    // Запрос сделок по каждому найденному символу
    for (const symbol of symbols) {
      try {
        const symbolTrades = await exchange.fetchMyTrades(symbol, since);
        allTrades.push(...symbolTrades.map((t: any) => ({ ...t, market_type: marketType })));
      } catch (e) { 
        console.log(`Нет сделок по ${symbol} на ${marketType}`); 
      }
    }

    // Сохранение в базу данных Neon
    for (const trade of allTrades) {
      await sql`
        INSERT INTO trades (user_id, symbol, side, price, amount, timestamp, external_id, exchange_name, market_type)
        VALUES (
          ${userId}, ${trade.symbol}, ${trade.side}, ${trade.price}, ${trade.amount}, 
          ${new Date(trade.timestamp).toISOString()}, ${trade.id}, ${exchange_name}, ${trade.market_type}
        )
        ON CONFLICT (external_id) DO NOTHING
      `;
    }

    return res.status(200).json({ 
      message: `Синхронизация ${marketType} завершена. Найдено пар: ${symbols.length}. Сделок: ${allTrades.length}` 
    });
  } catch (error: any) {
    console.error("Глобальная ошибка API:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
