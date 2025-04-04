import db from '../db.js';

// Obtém todos os usuários
export const getUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).json({ error: 'Erro interno ao buscar usuários' });
  }
};

// Adiciona um novo usuário
export const addUser = async (req, res) => {
  try {
    // Validação básica dos dados
    if (!req.body.nome || !req.body.email || !req.body.fone || !req.body.data_nascimento) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const q = "INSERT INTO usuarios(`nome`, `email`, `fone`, `data_nascimento`) VALUES(?, ?, ?, ?)";
    const values = [
      req.body.nome,  // Corrigido de 'name' para 'nome' para consistência
      req.body.email,
      req.body.fone,
      req.body.data_nascimento
    ];

    const [result] = await db.query(q, values);
    res.status(201).json({ 
      message: 'Usuário criado com sucesso',
      id: result.insertId 
    });
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    
    // Tratamento específico para email duplicado
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email já cadastrado' });
    }
    
    res.status(500).json({ error: 'Erro interno ao criar usuário' });
  }
};

// Atualiza um usuário existente
export const updateUser = async (req, res) => {
  try {
    const q = "UPDATE usuarios SET `nome` = ?, `email` = ?, `fone` = ?, `data_nascimento` = ? WHERE `id` = ?";
    const values = [
      req.body.nome,  // Corrigido de 'name' para 'nome'
      req.body.email,
      req.body.fone,
      req.body.data_nascimento,
      req.params.id
    ];

    const [result] = await db.query(q, values);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    res.json({ message: 'Usuário atualizado com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err);
    
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email já está em uso por outro usuário' });
    }
    
    res.status(500).json({ error: 'Erro interno ao atualizar usuário' });
  }
};

// Remove um usuário
export const deleteUser = async (req, res) => {
  try {
    const q = "DELETE FROM usuarios WHERE `id` = ?";
    const [result] = await db.query(q, [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    res.json({ message: 'Usuário removido com sucesso' });
  } catch (err) {
    console.error('Erro ao remover usuário:', err);
    res.status(500).json({ error: 'Erro interno ao remover usuário' });
  }
};