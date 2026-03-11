const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
    user: 'postgres', // Substitua pelo seu usuário do PostgreSQL
    // user: 'postgre', // Substitua pelo seu usuário do PostgreSQL
    // user: 'senai', // Substitua pelo seu usuário do PostgreSQL
    host: 'localhost',
    database: 'trunfo-dino', // Nome da sua database
    password: 'senai', // Substitua pela sua senha
    //password: 'postgre', // Substitua pela sua senha
    port: 5433, // Porta padrão do PostgreSQL
});

// Habilitar CORS para todas as rotas
app.use(cors());
app.use(express.json());

// Rota para buscar todos os dinos
app.get('/dinos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM DINO');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar dinos' });
    }
});

// Rota para buscar um dino por ID
app.get('/dinos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM DINO WHERE ID_DINO = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Dinos não encontrado' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar dinos' });
    }
});

// Rota para adicionar um dino
app.post('/dinos', async (req, res) => {
const { NOME, ALTURA, COMPRIMENTO, PESO, VELOCIDADE, AGILIDADE, LONGEVIDADE, NUMERO_MAGICO, IMAGEM } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO DINO (NOME, ALTURA, COMPRIMENTO, PESO, VELOCIDADE, AGILIDADE, LONGEVIDADE, NUMERO_MAGICO, IMAGEM) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [NOME, ALTURA, COMPRIMENTO, PESO, VELOCIDADE, AGILIDADE, LONGEVIDADE, NUMERO_MAGICO, IMAGEM]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao adicionar Dino' });
    }
});

// Rota para atualizar um dino
app.put('/dinos/:id', async (req, res) => {
    const { id } = req.params;
    const { NOME, ALTURA, COMPRIMENTO, PESO, VELOCIDADE, AGILIDADE, LONGEVIDADE, NUMERO_MAGICO, IMAGEM } = req.body;
    try {
        const result = await pool.query(
            'UPDATE DINO SET NOME = $1, ALTURA = $2, COMPRIMENTO = $3, PESO = $4, VELOCIDADE = $5, AGILIDADE = $6, LONGEVIDADE = $7, NUMERO_MAGICO = $8, IMAGEM = $9 WHERE ID_DINO = $10 RETURNING *',
            [NOME, ALTURA, COMPRIMENTO, PESO, VELOCIDADE, AGILIDADE, LONGEVIDADE, NUMERO_MAGICO, IMAGEM, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Dino não encontrado' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao atualizar Dino' });
    }
});

// Rota para deletar um dino
app.delete('/dinos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM DINO WHERE ID_DINO = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'dino não encontrado' });
        }
        res.json({ message: 'Dino deletado com sucesso' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao deletar dino' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

