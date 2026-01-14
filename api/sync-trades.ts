import { neon } from '@neondatabase/serverless';
import ccxt from 'ccxt';

export default async function handler(req: any, res: any) {
  const sql = neon(process.env.DATABASE_URL!);
  const { userId, loadHistory, marketType } = req.body; 

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
    const since = loadHistory ? Date.now() - 90 * 24 * 60 * 60 * 1000 : Date.now() - 24 * 60 * 60 * 1000;

    // Автоматический поиск символов через Income (историю транзакций)
    let symbols = [];
    if (ccxtMarketType === 'future') {
      const income = await (exchange as any).fapiPrivateGetIncome({ startTime: since });
      symbols = [...new Set(income.map((i: any) => i.symbol))]
        .filter(s => s)
        .map((s: any) => s.endsWith('USDT') ? s.replace(/USDT$/, '/USDT') : s);
      
      // Добавляем SOL/USDT принудительно для подстраховки
      if (!symbols.includes('SOL/USDT')) symbols.push('SOL/USDT');
    } else {
      const balances = await exchange.fetchBalance();
      symbols = Object.keys(balances.total).filter(c => balances.total[c] > 0).map(c => `${c}/USDT`);
    }

    for (const symbol of symbols) {
      try {
        const symbolTrades = await exchange.fetchMyTrades(symbol, since);
        if (symbolTrades.length > 0) {
          allTrades.push(...symbolTrades.map((t: any) => ({ 
            ...t, 
            market_type: marketType 
          })));
        }
      } catch (e) { console.log(`Ошибка по ${symbol}`); }
    }

    // Сохранение в базу
    for (const trade of allTrades) {
      // Очищаем символ от ":USDT" для красоты в таблице
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
      message: `Синхронизация ${marketType} прошла успешно! Загружено сделок: ${allTrades.length}` 
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
