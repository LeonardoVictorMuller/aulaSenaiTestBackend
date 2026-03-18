const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
    user: 'postgres', // Substitua pelo seu usuário do PostgreSQL
    host: 'localhost',
    database: 'trunfo-dino', // Nome da sua database
    password: 'senai', // Substitua pela sua senha
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

app.get('/dinos/random/:n', async (req, res) => {
    const { n } = req.params;
    try {
        if(n == undefined || n <= 0){
            return res.status(400).json({ error: 'Parãmetros deve ser interiro ou maior que 0'});
        }
        const result = await pool.query('SELECT * FROM dino ORDER BY RANDOM() LIMIT $1;', [n]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Dino não encontrado' });
        }
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar dino' });
    }
});

// Rota para buscar os top N dinos mais famosos (com desempate aleatório)
app.get('/dinos/top/fama/:n', async (req, res) => {
    const { n } = req.params;
    try {
        if(n == undefined || n <= 0){
            return res.status(400).json({ error: 'Parâmetro deve ser inteiro e maior que 0'});
        }
        
        // Ordena pela fama (maior pro menor) e mistura quem tiver a mesma quantidade de fama
        const result = await pool.query('SELECT * FROM DINO ORDER BY FAMA DESC, RANDOM() LIMIT $1;', [n]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Nenhum dino encontrado' });
        }
        
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar dinos famosos' });
    }
});

// Rota para buscar um dino por ID
app.get('/dinos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM DINO WHERE ID_DINO = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Dino não encontrado' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar dino' });
    }
});

// Rota para adicionar um dino (Refatorada)
app.post('/dinos', async (req, res) => {
    const { NOME, ALTURA, COMPRIMENTO, PESO, VELOCIDADE, AGILIDADE, LONGEVIDADE, NUMERO_MAGICO, IMAGEM, FAMA, TIPO } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO DINO 
            (NOME, ALTURA, COMPRIMENTO, PESO, VELOCIDADE, AGILIDADE, LONGEVIDADE, NUMERO_MAGICO, IMAGEM, FAMA, TIPO) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
            [NOME, ALTURA, COMPRIMENTO, PESO, VELOCIDADE, AGILIDADE, LONGEVIDADE, NUMERO_MAGICO, IMAGEM, FAMA, TIPO]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao adicionar Dino' });
    }
});

// Rota para atualizar um dino (Refatorada)
app.put('/dinos/:id', async (req, res) => {
    const { id } = req.params;
    const { NOME, ALTURA, COMPRIMENTO, PESO, VELOCIDADE, AGILIDADE, LONGEVIDADE, NUMERO_MAGICO, IMAGEM, FAMA, TIPO } = req.body;
    try {
        const result = await pool.query(
            `UPDATE DINO SET 
            NOME = $1, ALTURA = $2, COMPRIMENTO = $3, PESO = $4, VELOCIDADE = $5, 
            AGILIDADE = $6, LONGEVIDADE = $7, NUMERO_MAGICO = $8, IMAGEM = $9, FAMA = $10, TIPO = $11 
            WHERE ID_DINO = $12 RETURNING *`,
            [NOME, ALTURA, COMPRIMENTO, PESO, VELOCIDADE, AGILIDADE, LONGEVIDADE, NUMERO_MAGICO, IMAGEM, FAMA, TIPO, id]
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
            return res.status(404).json({ error: 'Dino não encontrado' });
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