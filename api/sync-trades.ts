import { neon } from '@neondatabase/serverless';
import ccxt from 'ccxt';

export default async function handler(req: any, res: any) {
  const sql = neon(process.env.DATABASE_URL!);
  const { userId, loadHistory } = req.body; 

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
      options: { 'defaultType': 'spot' } // Указываем, что работаем со спотом
    });

    // --- НАЧАЛО ИЗМЕНЕНИЙ ---
    
    // 1. Получаем балансы, чтобы найти монеты, которыми вы торговали
    const balances = await exchange.fetchBalance();
    const symbols = Object.keys(balances.total)
      .filter(coin => balances.total[coin] > 0 || balances.used[coin] > 0)
      .map(coin => `${coin}/USDT`); 

    // Если балансов нет, добавим популярную пару для теста
    if (symbols.length === 0) symbols.push('BTC/USDT');

    let allTrades = [];
    const since = loadHistory ? undefined : Date.now() - 24 * 60 * 60 * 1000;

    // 2. Опрашиваем Binance по каждой найденной паре
    for (const symbol of symbols) {
      try {
        // Теперь мы передаем symbol, как того требует Binance
        const symbolTrades = await exchange.fetchMyTrades(symbol, since);
        allTrades.push(...symbolTrades);
      } catch (e) {
        console.log(`Пропуск пары ${symbol}: сделок не найдено или нет доступа.`);
      }
    }
    
    // --- КОНЕЦ ИЗМЕНЕНИЙ ---

    // Сохраняем все найденные сделки в базу Neon
    for (const trade of allTrades) {
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

    return res.status(200).json({ 
      message: `Успешно! Проверено пар: ${symbols.length}. Сохранено новых сделок: ${allTrades.length}` 
    });
  } catch (error: any) {
    console.error('Ошибка синхронизации:', error.message);
    return res.status(500).json({ error: error.message });
  }
}
