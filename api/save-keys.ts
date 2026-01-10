import { neon } from '@neondatabase/serverless';

export default async function handler(req: any, res: any) {
  const sql = neon(process.env.DATABASE_URL!);

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId, apiKey, apiSecret, label } = req.body;

  if (!userId || !apiKey || !apiSecret) {
    return res.status(400).json({ error: 'Не все поля заполнены' });
  }

  try {
    // Записываем ключи. Если для этого юзера уже есть ключи binance — обновляем их
    await sql`
      INSERT INTO api_keys (user_id, exchange_name, api_key, api_secret)
      VALUES (${userId}, 'binance', ${apiKey}, ${apiSecret})
      ON CONFLICT (user_id, exchange_name) 
      DO UPDATE SET api_key = ${apiKey}, api_secret = ${apiSecret}
    `;

    return res.status(200).json({ success: true, message: 'Ключи сохранены' });
    } catch (error: any) {
      console.error(error);
      // Возвращаем реальный текст ошибки от Neon (например: column "exchange_name" does not exist)
      return res.status(500).json({ error: error.message });
    }
}
