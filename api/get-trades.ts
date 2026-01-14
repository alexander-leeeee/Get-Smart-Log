import { neon } from '@neondatabase/serverless';

export default async function handler(req: any, res: any) {
  const sql = neon(process.env.DATABASE_URL!);
  const { userId, marketType } = req.query;

  try {
    const trades = await sql`
      SELECT * FROM trades 
      WHERE user_id = ${userId} AND market_type = ${marketType}
      ORDER BY timestamp DESC
    `;
    
    const formattedTrades = trades.map(t => ({
      id: t.external_id || t.id.toString(),
      symbol: t.symbol,
      entryPrice: parseFloat(t.price),
      exitPrice: parseFloat(t.price),
      size: parseFloat(t.amount),
      direction: t.side.toUpperCase() === 'BUY' ? 'LONG' : 'SHORT',
      date: new Date(t.timestamp).toLocaleString('uk-UA'),
      pnl: parseFloat(t.pnl || 0), // Твой реализованный убыток -0.014
      fees: parseFloat(t.commission || 0), // Комиссия
      orderType: t.order_type, // MARKET/LIMIT
      marketType: t.market_type
    }));

    return res.status(200).json({ trades: formattedTrades });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
