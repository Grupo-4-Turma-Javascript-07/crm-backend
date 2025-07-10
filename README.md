# 📊 CRM Backend

Projeto backend de um sistema CRM com autenticação JWT, documentação Swagger, e funcionalidades completas de CRUD com relacionamento entre entidades.

---

## ✅ Objetivo e Modelo de Negócio

Desenvolver uma API segura com autenticação JWT, baseada em um sistema de CRM para gerenciamento de produtos categorizados por usuários autenticados.  
O sistema inclui três entidades principais (`Usuario`, `Categoria`, `Produto`), com relacionamentos adequados, e uma funcionalidade especial no service para alterar o status de uma **oportunidade de venda** de `false` para `true`**.

---

## 🧾 Descrição Geral

- Autenticação JWT com rotas protegidas
- CRUD completo para `Usuario`, `Categoria` e `Produto`
- Relacionamentos entre entidades:
  - `Produto` pertence a um `Usuario` (N:1)
  - `Produto` pertence a uma `Categoria` (N:1)
- Documentação interativa com Swagger
- Deploy do backend
- Funcionalidade extra: **atualização de status de venda**

---

## 🔄 Funcionalidades CRUD

- `POST /auth/cadastrar` — cadastrar novo usuário
- `POST /auth/logar` — login e geração de token JWT
- `GET /produto` — listar produtos (rota protegida)
- `POST /produto` — criar produto (rota protegida)
- `PUT /produto/:id` — atualizar produto
- `PATCH /produto/:id/status` — lógica especial: atualizar status de venda de `false` para `true`
- `DELETE /produto/:id` — excluir produto
- CRUD completo também para `categoria` e `usuario`

---

## 🧪 Tecnologias Utilizadas

| Tecnologias        | Versão / Observação              |
|--------------------|----------------------------------|
| NestJS             | Framework principal (backend)    |
| TypeORM            | ORM para banco de dados          |
| MySQL              | Banco de dados relacional        |
| JWT                | Autenticação via token           |
| Swagger            | Documentação de API              |
| Dotenv             | Variáveis de ambiente            |

---

## 🔐 Segurança

- Uso de `@nestjs/passport`, `passport-jwt` e `bcrypt` para autenticação segura
- Padrão de autenticação: **HTTP Bearer Token**
- Todas as rotas CRUD são protegidas com **JWT Guard**

---

## 🛠️ Setup e Execução

### 1. Clone o repositório:
```bash
git clone https://github.com/Grupo-4-Turma-Javascript-07/crm-backend.git
```  

### 2. Instale as dependências:
```bash
npm install
```

### 3. Configure seu arquivo .env:
```bash
DB_TYPE=seu-banco
DB_HOST=localhost
DB_PORT=porta-banco
DB_USERNAME=seu-username
DB_PASSWORD=sua-senha
DB_NAME=nome-banco
```  

### 4. Execução da Aplicação:
```bash
npm run start:dev
```

### 5. Documentação Swagger
Acesse a documentação da API em:
`http://localhost:3000/api`

### 6. Deploy
O projeto será disponibilizado com deploy ativo via plataforma [Render](https://render.com).

### 7. Testes
Os testes também podem ser feitos com [Insomnia](https://insomnia.rest), importando as rotas e verificando as respostas do CRUD.

## 👥 Autores

* [@marinavarroo](https://github.com/marinavarroo)
* [@VanessaTargino](https://github.com/VanessaTargino)
* [@oligEdu](https://github.com/oligEdu)
* [@melcsilva](https://github.com/melcsilva)
* [@igorpardinho](https://github.com/igorpardinho)
* [@Juliotbr](https://github.com/Juliotbr)
* [@larissa-pinheiro](https://github.com/larissa-pinheiro)

---

Projeto desenvolvido em grupo como parte do aprendizado prático no bootcamp FullStack JavaScript da Generation Brasil.
