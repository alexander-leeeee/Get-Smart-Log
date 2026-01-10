import { neon } from '@neondatabase/serverless';
import ccxt from 'ccxt';

export default async function handler(req: any, res: any) {
  const sql = neon(process.env.DATABASE_URL!);
  const { userId } = req.body;

  try {
    // 1. Получаем ключи из базы
    const keys = await sql`SELECT api_key, api_secret FROM api_keys WHERE user_id = ${userId}`;
    if (keys.length === 0) return res.status(404).json({ error: 'Keys not found' });

    // 2. Инициализируем Binance
    const exchange = new ccxt.binance({
      apiKey: keys[0].api_key,
      secret: keys[0].api_secret,
    });

    // 3. Получаем последние сделки (например, по BTC/USDT)
    const trades = await exchange.fetchMyTrades('BTC/USDT');

    // 4. Записываем их в базу (тут нужна проверка на дубликаты)
    for (const trade of trades) {
      await sql`
        INSERT INTO trades (user_id, symbol, side, price, amount, timestamp)
        VALUES (${userId}, ${trade.symbol}, ${trade.side}, ${trade.price}, ${trade.amount}, ${new Date(trade.timestamp).toISOString()})
        ON CONFLICT DO NOTHING
      `;
    }

    return res.status(200).json({ message: 'Trades synced' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
