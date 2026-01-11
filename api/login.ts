import { neon } from '@neondatabase/serverless';

export default async function handler(req: any, res: any) {
  const sql = neon(process.env.DATABASE_URL!);

  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Ищем пользователя по email
      const users = await sql`
        SELECT * FROM users WHERE email = ${email} AND password = ${password}
      `;

      if (users.length > 0) {
        const dbUser = users[0];
        
        return res.status(200).json({ 
          message: 'Login successful', 
          user: {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email
          }
        });
      
      } else {
        return res.status(401).json({ error: 'Неверный email или пароль' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ошибка сервера при входе' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
