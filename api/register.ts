import { neon } from '@neondatabase/serverless';

export default async function handler(req: any, res: any) {
  // Настройка подключения к базе (Vercel сам подставит DATABASE_URL)
  const sql = neon(process.env.DATABASE_URL!);

  if (req.method === 'POST') {
    const { email, password, name } = req.body;

    try {
      // Записываем пользователя в нашу таблицу users
      await sql`
        INSERT INTO users (email, password, name)
        VALUES (${email}, ${password}, ${name})
      `;
      return res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'User already exists or database error' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
