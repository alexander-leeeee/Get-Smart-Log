import { neon } from '@neondatabase/serverless';
import ccxt from 'ccxt';

export default async function handler(req: any, res: any) {
  const sql = neon(process.env.DATABASE_URL!);
  const { userId, marketType } = req.body; 

  try {
    const keys = await sql`SELECT api_key, api_secret FROM api_keys WHERE user_id = ${userId} LIMIT 1`;
    if (keys.length === 0) return res.status(404).json({ error: 'Ключи не найдены' });

    // Инициализация В ТОЧНОСТИ как в успешном дебаге
    const exchange = new ccxt.binance({
      apiKey: keys[0].api_key,
      secret: keys[0].api_secret,
      options: { 'defaultType': 'future' } // Принудительно фьючерсы USDT-M
    });

    // Прямой запрос по твоей паре, которая точно есть
    const trades = await exchange.fetchMyTrades('SOL/USDT:USDT', undefined, 10);
    
    console.log(`[DEBUG] Binance отдал: ${trades.length} сделок.`);

    if (trades.length === 0) {
      return res.status(200).json({ message: "Биржа вернула 0 сделок. Проверьте API ключи или рынок." });
    }

    for (const trade of trades) {
      const info = trade.info || {};
      const cleanSymbol = trade.symbol.split(':')[0]; // Из SOL/USDT:USDT делаем SOL/USDT
      
      await sql`
        INSERT INTO trades (
          user_id, symbol, side, price, amount, timestamp, 
          external_id, exchange_name, market_type, pnl, 
          order_type, commission, commission_asset
        )
        VALUES (
          ${userId}, ${cleanSymbol}, ${trade.side}, ${trade.price}, ${trade.amount}, 
          ${new Date(trade.timestamp).toISOString()}, ${trade.id}, 'binance', 
          'FUTURES', 
          ${info.realizedPnl ? parseFloat(info.realizedPnl) : 0}, 
          ${info.type || 'MARKET'}, 
          ${info.commission ? parseFloat(info.commission) : (trade.fee ? trade.fee.cost : 0)}, 
          ${info.commissionAsset || (trade.fee ? trade.fee.currency : 'USDT')}
        )
        ON CONFLICT (external_id) DO NOTHING
      `;
    }

    return res.status(200).json({ 
      message: `Успех! В базу записано сделок: ${trades.length}` 
    });
  } catch (error: any) {
    console.error("SYNC ERROR:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
