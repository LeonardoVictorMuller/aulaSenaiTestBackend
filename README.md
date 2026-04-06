

---

# 🧠 Backend PostgreSQL - CRUD de Clientes - Node.js + Express

Este é um backend simples e funcional em Node.js com Express e PostgreSQL, fornecendo uma API REST para operações de CRUD em uma tabela de clientes. Ele é parte do projeto **UCRUD-FULLJS**, e está localizado na pasta `backend-PostgreSQL`.

## 🚀 Tecnologias

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

## 📁 Estrutura

```

UCRUD-FULLJS/
├── backend-PostgreSQL/
│   ├── src/
│   │   └── server.js
│   └── package.json

````

> 📌 Certifique-se de executar os comandos sempre a partir da pasta `backend-PostgreSQL`.

## 📦 Instalação e Execução

```bash
cd backend-PostgreSQL
npm install
npm start
````

O servidor será iniciado em:
🔗 `http://localhost:3000`

## 🛠️ Requisitos

* Node.js
* PostgreSQL em execução local
* Banco de dados `crud_cliente_demo` com a seguinte tabela:

```sql
CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  endereco VARCHAR(200),
  email VARCHAR(100),
  telefone VARCHAR(20)
);
```

## 🔐 Configuração de acesso ao banco

A configuração da conexão está em `src/server.js`:

```js
const pool = new Pool({
  user: 'postgres',
  password: 'sua_senha',
  host: 'localhost',
  database: 'crud_cliente_demo',
  port: 5432
});
```

Você pode mover esses dados para um arquivo `.env` com `dotenv`, se desejar mais segurança e flexibilidade.

## 📚 Rotas disponíveis

| Método | Rota            | Descrição                     |
| ------ | --------------- | ----------------------------- |
| GET    | `/clientes`     | Lista todos os clientes       |
| GET    | `/clientes/:id` | Retorna cliente por ID        |
| POST   | `/clientes`     | Cadastra um novo cliente      |
| PUT    | `/clientes/:id` | Atualiza um cliente existente |
| DELETE | `/clientes/:id` | Deleta um cliente do banco    |

## 🔗 Frontends compatíveis

* [`frontAxios`](../frontAxios) - React + Axios
* [`frontFetch`](../frontFetch) - React + Fetch API

## 📄 Licença

Este projeto está sob a licença MIT.

---

Feito com 💙 por [rafaellindemann](https://github.com/rafaellindemann)


---

<!-- 
{
        "id": 0,
         "codigo": 0,
         "titulo": "0",
         "categoria": "0",
         "sub-categoria": null,
         "descricao": "",
         "descricaoCurta": "",
         "palavrasChave": [],
         "exemplos": [],
         "relacionados": []
    } -->


