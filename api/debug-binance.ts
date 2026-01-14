import ccxt from 'ccxt';
import { neon } from '@neondatabase/serverless';

export default async function handler(req: any, res: any) {
  const sql = neon(process.env.DATABASE_URL!);
  const { userId } = req.query;

  try {
    const keys = await sql`SELECT api_key, api_secret FROM api_keys WHERE user_id = ${userId} LIMIT 1`;
    if (keys.length === 0) return res.status(404).json({ error: 'Ключи не найдены' });

    const exchange = new ccxt.binance({
      apiKey: keys[0].api_key,
      secret: keys[0].api_secret,
      options: { 'defaultType': 'future' } // Принудительно USDT-M Futures
    });

    // Запрашиваем последние 5 сделок по SOL/USDT напрямую
    const trades = await exchange.fetchMyTrades('SOL/USDT', undefined, 5);

    console.log("ОТВЕТ BINANCE:", JSON.stringify(trades, null, 2));

    return res.status(200).json({ 
      count: trades.length,
      raw: trades 
    });
  } catch (error: any) {
    console.error("DEBUG ERROR:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
