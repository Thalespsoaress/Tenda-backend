───────────────────────────────────────────────
🧠 TENDA — BACKEND API
───────────────────────────────────────────────

📦 Stack Principal
──────────────────

- NestJS 10 + TypeORM + PostgreSQL
- Docker (banco isolado e reprodutível)
- JWT + Passport (autenticação segura)
- Class Validator (validação de DTOs)
- Swagger (documentação automática)

───────────────────────────────────────────────
🧭 Sobre o Projeto
───────────────────────────────────────────────
O **Tenda** é um aplicativo B2B2C pensado para supermercados locais.  
A proposta é oferecer o que os grandes marketplaces ainda não fazem direito:

• Controle de estoque realmente preciso  
• Entrada facilitada para mercados menores  
• Experiência de compra mais personalizada

Este repositório contém o **backend completo** — desenvolvido com foco em
aprendizado profissional real e estrutura escalável.

───────────────────────────────────────────────
⚙️ Tecnologias & Ferramentas
───────────────────────────────────────────────
🚀 NestJS – arquitetura modular e produtiva  
🗄 PostgreSQL + TypeORM – ORM robusto e tipado  
🔒 JWT + bcrypt – autenticação e segurança  
🧾 Swagger – documentação visual e testável  
🐳 Docker – ambiente isolado e fácil de subir

───────────────────────────────────────────────
📂 Estrutura do Projeto
───────────────────────────────────────────────
src/
├── config/ # Configurações gerais (TypeORM, env)
├── user/ # CRUD de usuários
│ ├── dto/
│ ├── user.controller.ts
│ ├── user.service.ts
│ └── user.entity.ts
└── auth/ # Autenticação JWT
├── auth.controller.ts
├── auth.service.ts
├── auth.module.ts
└── jwt.strategy.ts

───────────────────────────────────────────────
⚡ Como Rodar o Projeto
───────────────────────────────────────────────

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/tenda-backend.git
cd tenda-backend

# Instale as dependências
npm install

# Suba o banco via Docker
docker-compose up -d

# Crie o arquivo .env a partir do exemplo
cp .env.example .env

# Rode em modo desenvolvimento
npm run start:dev
───────────────────────────────────────────────
🔐 Exemplo de .env
───────────────────────────────────────────────
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=tenda

JWT_SECRET=seu-segredo-aqui
JWT_EXPIRES_IN=1d

BCRYPT_SALT_ROUNDS=10
PORT=3000

───────────────────────────────────────────────
🧾 Rotas Principais
───────────────────────────────────────────────
👤 USERS → /users
POST /users → Cria novo usuário
GET /users → Lista todos (JWT obrigatório)
GET /users/:id → Retorna usuário pelo ID
DELETE /users/:id → Remove usuário

🔑 AUTH → /auth
POST /auth/login → Retorna token JWT com email e senha

───────────────────────────────────────────────
📘 Documentação (Swagger)
───────────────────────────────────────────────
Após iniciar o projeto:
🌍 http://localhost:3000/api/docs

👉 Clique em Authorize e insira:

Copiar código
Bearer {seu_token_jwt}

───────────────────────────────────────────────
💡 Próximos Passos
───────────────────────────────────────────────

Criar seed automático para admin@tenda.com

Adicionar testes automatizados

Desenvolver o frontend (Next.js + Tailwind)

───────────────────────────────────────────────
✍️ Autor
───────────────────────────────────────────────
Thales Soares
```
