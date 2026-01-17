// Этот код выполняет роль "мозга" бота внутри вашего сайта
import Binance from 'node-binance-api';

const binance = new Binance().options({
  APIKEY: 'ВАШ_API_KEY_BINANCE',
  APISECRET: 'ВАШ_SECRET_KEY_BINANCE',
  family: 4 // Важно для стабильной связи
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const data = req.body; // Получаем символ, стоп, тейк и сумму

  try {
    let result;
    // Логика открытия сделки (Фьючерсы)
    if (data.direction === 'BUY') {
      result = await binance.futuresMarketBuy(data.symbol, data.amount);
    } else {
      result = await binance.futuresMarketSell(data.symbol, data.amount);
    }

    // Выставляем Стоп-Лосс и Тейк-Профит сразу после входа
    await binance.futuresMarketSell(data.symbol, data.amount, { stopPrice: data.stopLoss, type: 'STOP_MARKET' });
    await binance.futuresMarketSell(data.symbol, data.amount, { stopPrice: data.takeProfit, type: 'TAKE_PROFIT_MARKET' });

    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
