import db from '../db.js'; // Importe o pool

// Exemplo de uso
export const getUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM usuarios'); // ✅ db.query existe
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};