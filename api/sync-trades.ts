import { neon } from '@neondatabase/serverless';
import ccxt from 'ccxt';

export default async function handler(req: any, res: any) {
  const sql = neon(process.env.DATABASE_URL!);
  
  // Получаем userId из запроса (его должен прислать фронтенд)
  const { userId } = req.body;

  if (!userId) return res.status(400).json({ error: 'Укажите ID пользователя' });

  try {
    // 1. Достаем ключи именно из вашей новой таблицы api_keys
    const keys = await sql`
      SELECT api_key, api_secret FROM api_keys 
      WHERE user_id = ${userId} AND exchange_name = 'binance' 
      LIMIT 1
    `;

    if (keys.length === 0) return res.status(404).json({ error: 'API ключи не найдены' });

    // 2. Подключаемся к Binance
    const exchange = new ccxt.binance({
      apiKey: keys[0].api_key,
      secret: keys[0].api_secret,
    });

    // 3. Загружаем сделки (fetchMyTrades вытягивает историю)
    // Можно добавить параметры, например символ или лимит
    const trades = await exchange.fetchMyTrades();

    // 4. Сохраняем в таблицу trades
    for (const trade of trades) {
      await sql`
        INSERT INTO trades (user_id, symbol, side, price, amount, timestamp, external_id)
        VALUES (
          ${userId}, 
          ${trade.symbol}, 
          ${trade.side}, 
          ${trade.price}, 
          ${trade.amount}, 
          ${new Date(trade.timestamp).toISOString()},
          ${trade.id} -- external_id нужен, чтобы не было дубликатов
        )
        ON CONFLICT (external_id) DO NOTHING
      `;
    }

    return res.status(200).json({ 
      success: true, 
      count: trades.length,
      message: `Синхронизировано ${trades.length} сделок` 
    });

  } catch (error: any) {
    console.error('Ошибка Binance API:', error);
    return res.status(500).json({ error: 'Ошибка синхронизации: ' + error.message });
  }
}
