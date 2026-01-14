import { neon } from '@neondatabase/serverless';
import ccxt from 'ccxt';

export default async function handler(req: any, res: any) {
  const sql = neon(process.env.DATABASE_URL!);
  const { userId, marketType } = req.query;

  try {
    const keys = await sql`SELECT api_key, api_secret FROM api_keys WHERE user_id = ${userId} LIMIT 1`;
    if (keys.length === 0) return res.status(404).json({ error: 'Ключи не найдены' });

    const exchange = new ccxt.binance({
      apiKey: keys[0].api_key,
      secret: keys[0].api_secret,
      options: { 'defaultType': marketType === 'FUTURES' ? 'future' : 'spot' }
    });

    const balance = await exchange.fetchBalance();
    // Для фьючерсов берем 'total', для USDT
    const totalBalance = balance.total['USDT'] || 0;

    return res.status(200).json({ balance: totalBalance });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
