// config/db.js
import mysql from 'mysql2/promise';

// Crie um POOL de conexões (não uma conexão única)
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // ⚠️ Nunca deixe vazio em produção!
  database: "crud_app",
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool; // Exporte o pool, não uma conexão