import Binance from 'node-binance-api';
import mysql from 'mysql2/promise'; // Используем ваше подключение к базе

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { userId, symbol, direction, amount, stopLoss, takeProfit } = req.body;

  try {
    // 1. Идем в вашу базу MySQL за ключами именно этого пользователя
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'ваша_база'
    });

    const [rows] = await connection.execute(
      'SELECT api_key, api_secret FROM users WHERE id = ?', 
      [userId]
    );
    
    const userKeys = rows[0];
    if (!userKeys) throw new Error('API ключи не найдены в вашем кабинете');

    // 2. Инициализируем Бинанс с ключами этого пользователя
    const binance = new Binance().options({
      APIKEY: userKeys.api_key,
      APISECRET: userKeys.api_secret,
      family: 4
    });

    // 3. Выполняем сделку
    let result;
    if (direction === 'BUY') {
      result = await binance.futuresMarketBuy(symbol, amount);
    } else {
      result = await binance.futuresMarketSell(symbol, amount);
    }

    // Выставляем стоп и тейк
    await binance.futuresMarketSell(symbol, amount, { stopPrice: stopLoss, type: 'STOP_MARKET' });
    await binance.futuresMarketSell(symbol, amount, { stopPrice: takeProfit, type: 'TAKE_PROFIT_MARKET' });

    await connection.end();
    res.status(200).json({ success: true, result });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
