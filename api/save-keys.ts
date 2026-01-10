import { neon } from '@neondatabase/serverless';

export default async function handler(req: any, res: any) {
  const sql = neon(process.env.DATABASE_URL!);

  if (req.method === 'POST') {
    const { userId, exchange, label, apiKey, apiSecret } = req.body;

    try {
      await sql`
        INSERT INTO exchange_connections (user_id, exchange_name, label, api_key, api_secret)
        VALUES (${userId}, ${exchange}, ${label}, ${apiKey}, ${apiSecret})
      `;
      return res.status(200).json({ message: 'Ключи успешно сохранены в базе' });
    } catch (error) {
      return res.status(500).json({ error: 'Ошибка сохранения ключей' });
    }
  }
  return res.status(405).send('Method not allowed');
}
