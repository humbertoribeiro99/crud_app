import express from 'express';
import userRoutes from './routes/users.js';
import cors from 'cors';

const app = express();
const PORT = 8800;

// Configuração correta
app.use(cors());
app.use(express.json());

// Rotas prefixadas corretamente
app.use('/api/users', userRoutes);

// Rota de teste para verificar se o servidor está respondendo
app.get('/api/health', (req, res) => {
  res.json({ status: 'online', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});