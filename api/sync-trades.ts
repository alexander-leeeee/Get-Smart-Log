import { neon } from '@neondatabase/serverless';
import ccxt from 'ccxt';

export default async function handler(req: any, res: any) {
  const sql = neon(process.env.DATABASE_URL!);
  const { userId, loadHistory, marketType } = req.body; 

  try {
    const connection = await sql`SELECT api_key, api_secret, exchange_name FROM api_keys WHERE user_id = ${userId} LIMIT 1`;
    if (connection.length === 0) return res.status(404).json({ error: 'Ключи не найдены' });

    const { api_key, api_secret, exchange_name } = connection[0];
    
    // Приводим типы из фронтенда ('SPOT'/'FUTURES') к формату CCXT ('spot'/'future')
    const ccxtMarketType = marketType === 'FUTURES' ? 'future' : 'spot';

    const exchange = new (ccxt as any)[exchange_name]({
      apiKey: api_key,
      secret: api_secret,
      options: { 'defaultType': ccxtMarketType }
    });

    let symbols = [];
    if (ccxtMarketType === 'future') {
      try {
        const positions = await exchange.fetchPositions();
        symbols = positions
          .filter((p: any) => parseFloat(p.contracts) !== 0 || (p.info && parseFloat(p.info.unrealizedProfit) !== 0))
          .map((p: any) => p.symbol);
        
        if (!symbols.includes('SOL/USDT')) symbols.push('SOL/USDT'); // Гарантируем проверку SOL
      } catch (e) {
        symbols = ['SOL/USDT', 'BTC/USDT'];
      }
    } else {
      const balances = await exchange.fetchBalance();
      symbols = Object.keys(balances.total).filter(c => balances.total[c] > 0).map(c => `${c}/USDT`);
    }

    const since = loadHistory ? undefined : Date.now() - 24 * 60 * 60 * 1000;
    let allTrades = [];

    for (const symbol of symbols) {
      try {
        const symbolTrades = await exchange.fetchMyTrades(symbol, since);
        // Сохраняем marketType именно так, как он называется во фронтенде ('SPOT' или 'FUTURES')
        allTrades.push(...symbolTrades.map((t: any) => ({ ...t, market_type: marketType })));
      } catch (e) { console.log(`Нет сделок по ${symbol}`); }
    }

    for (const trade of allTrades) {
      await sql`
        INSERT INTO trades (user_id, symbol, side, price, amount, timestamp, external_id, exchange_name, market_type)
        VALUES (${userId}, ${trade.symbol}, ${trade.side}, ${trade.price}, ${trade.amount}, 
                ${new Date(trade.timestamp).toISOString()}, ${trade.id}, ${exchange_name}, ${trade.market_type})
        ON CONFLICT (external_id) DO NOTHING
      `;
    }

    return res.status(200).json({ message: `Загружено сделок (${marketType}): ${allTrades.length}` });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
