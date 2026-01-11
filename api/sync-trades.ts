import { neon } from '@neondatabase/serverless';
import ccxt from 'ccxt';

export default async function handler(req: any, res: any) {
  const sql = neon(process.env.DATABASE_URL!);
  const { userId, connectionId, loadHistory } = req.body; 

  try {
    const connection = await sql`
      SELECT api_key, api_secret, exchange_name 
      FROM api_keys 
      WHERE user_id = ${userId} 
      LIMIT 1
    `;

    if (connection.length === 0) return res.status(404).json({ error: 'Подключение не найдено' });

    const { api_key, api_secret, exchange_name } = connection[0];

    const exchange = new (ccxt as any)[exchange_name]({
      apiKey: api_key,
      secret: api_secret,
    });

    const since = loadHistory ? undefined : Date.now() - 24 * 60 * 60 * 1000;
    const trades = await exchange.fetchMyTrades(undefined, since);

    for (const trade of trades) {
      await sql`
        INSERT INTO trades (user_id, symbol, side, price, amount, timestamp, external_id, exchange_name)
        VALUES (
          ${userId}, ${trade.symbol}, ${trade.side}, ${trade.price}, 
          ${trade.amount}, ${new Date(trade.timestamp).toISOString()}, 
          ${trade.id}, ${exchange_name}
        )
        ON CONFLICT (external_id) DO NOTHING
      `;
    }

    return res.status(200).json({ message: `С биржи ${exchange_name} загружено ${trades.length} сделок` });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
