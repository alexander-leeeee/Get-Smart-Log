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
    // Для теста берем с запасом от 1 января
    const since = new Date('2026-01-01').getTime();

    // Прямой запрос по SOL/USDT:USDT (как в дебаге)
    const symbols = marketType === 'FUTURES' ? ['SOL/USDT:USDT'] : []; 

    for (const symbol of symbols) {
      try {
        const symbolTrades = await exchange.fetchMyTrades(symbol, since);
        if (symbolTrades.length > 0) {
          allTrades.push(...symbolTrades.map((t: any) => {
            const info = t.info || {};
            return {
              ...t,
              market_type: marketType,
              // Вытягиваем PnL и комиссии из сырых данных Binance
              realized_pnl: info.realizedPnl ? parseFloat(info.realizedPnl) : 0,
              order_type: info.type || 'MARKET',
              commission: info.commission ? parseFloat(info.commission) : (t.fee ? t.fee.cost : 0),
              commission_asset: info.commissionAsset || (t.fee ? t.fee.currency : 'USDT')
            };
          }));
        }
      } catch (e) { console.log(`Ошибка по ${symbol}`); }
    }

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
          commission = EXCLUDED.commission,
          order_type = EXCLUDED.order_type,
          commission_asset = EXCLUDED.commission_asset;
      `;
    }

    return res.status(200).json({ 
      message: `Данные обновлены! Сделок в базе: ${allTrades.length}` 
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
