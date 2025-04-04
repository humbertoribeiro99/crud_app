📝 CRUD de Usuários - Full Stack
Aplicação completa para gerenciamento de usuários com frontend em React e backend em Node.js + MySQL.

🚀 Funcionalidades
Criação de novos usuários

Leitura e listagem de usuários cadastrados

Atualização de dados de usuários existentes

Exclusão de usuários

Design responsivo para mobile e desktop

Validação de formulários

Notificações toast para feedback das ações

🛠 Tecnologias Utilizadas
Frontend
React.js

Styled Components

Axios (para requisições HTTP)

React Icons (FaTrash, FaEdit)

React Toastify (notificações)

Backend
Node.js

Express

MySQL (via módulo mysql2)

CORS (para permitir requisições do frontend)

📋 Pré-requisitos
Node.js (v16 ou superior)

MySQL (ou serviço de banco de dados)

NPM ou Yarn

⚙️ Configuração do Ambiente
Backend
Navegue até a pasta do backend:

bash
Copy
cd backend
Instale as dependências:

bash
Copy
npm install
Configure o banco de dados:

Crie um arquivo .env baseado no .env.example

Configure as credenciais do seu MySQL

Execute as migrations (se necessário):

bash
Copy
npm run migrate
Inicie o servidor:

bash
Copy
npm start
Frontend
Navegue até a pasta do frontend:

bash
Copy
cd frontend
Instale as dependências:

bash
Copy
npm install
Inicie a aplicação:

bash
Copy
npm run dev
🗃 Estrutura do Projeto

🌐 Rotas da API
Método	Rota	Descrição
GET	/api/users	Lista todos usuários
POST	/api/users	Cria novo usuário
PUT	/api/users/:id	Atualiza um usuário
DELETE	/api/users/:id	Remove um usuário


🤝 Contribuição
Contribuições são bem-vindas! Siga os passos:

Faça um fork do projeto

Crie sua branch (git checkout -b feature/nova-feature)

Commit suas mudanças (git commit -m 'Adiciona nova feature')

Push para a branch (git push origin feature/nova-feature)

Abra um Pull Request
