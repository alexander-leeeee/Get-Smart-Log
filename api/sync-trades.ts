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
    // Используем только SOL/USDT:USDT для теста, раз мы точно знаем, что сделка там
    let symbols = ['SOL/USDT:USDT']; 

    // Если это не тест, подтягиваем остальные пары через Income
    if (ccxtMarketType === 'future') {
       try {
         const income = await (exchange as any).fapiPrivateGetIncome({ startTime: Date.now() - 7 * 24 * 60 * 60 * 1000 });
         const foundSymbols = [...new Set(income.map((i: any) => i.symbol))]
           .filter(s => s)
           .map((s: any) => `${s.replace(/USDT$/, '/USDT')}:USDT`);
         symbols = [...new Set([...symbols, ...foundSymbols])];
       } catch (e) { console.log("Ошибка Income, идем по списку"); }
    }

    for (const symbol of symbols) {
      try {
        const symbolTrades = await exchange.fetchMyTrades(symbol, since);
        if (symbolTrades.length > 0) {
          allTrades.push(...symbolTrades.map((t: any) => {
            // Извлекаем расширенные данные из объекта info от Binance
            const info = t.info || {};
            return {
              ...t,
              market_type: marketType,
              // Binance передает realizedPnl только для закрывающих сделок
              realized_pnl: info.realizedPnl ? parseFloat(info.realizedPnl) : 0,
              order_type: info.type || 'MARKET', // По умолчанию MARKET, если не указано
              commission: info.commission ? parseFloat(info.commission) : (t.fee ? t.fee.cost : 0),
              commission_asset: info.commissionAsset || (t.fee ? t.fee.currency : 'USDT')
            };
          }));
        }
      } catch (e) { console.log(`Ошибка по ${symbol}`); }
    }

    // Сохранение в базу
    for (const trade of allTrades) {
      const cleanSymbol = trade.symbol.split(':')[0]; 
      
      await sql`
        INSERT INTO trades (
          user_id, symbol, side, price, amount, timestamp, 
          external_id, exchange_name, market_type, pnl, 
          order_type, commission, commission_asset
        )
        VALUES (
          ${userId}, ${cleanSymbol}, ${trade.side}, ${trade.price}, ${trade.amount}, 
          ${new Date(trade.timestamp).toISOString()}, ${trade.id}, ${exchange_name}, 
          ${trade.market_type}, ${trade.realized_pnl}, ${trade.order_type}, 
          ${trade.commission}, ${trade.commission_asset}
        )
        ON CONFLICT (external_id) DO UPDATE SET
          pnl = EXCLUDED.pnl,
          commission = EXCLUDED.commission;
      `;
    }

    return res.status(200).json({ 
      message: `Синхронизация завершена. Найдено сделок: ${allTrades.length}` 
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
