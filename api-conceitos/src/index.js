const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const caminhoArquivo = path.join(__dirname, '..', 'data.json');

// ==========================
// FUNÇÕES AUXILIARES
// ==========================

// Ler dados
function lerDados() {
    try {
        const data = fs.readFileSync(caminhoArquivo, 'utf-8');
        return JSON.parse(data);
    } catch (erro) {
        console.error('Erro ao ler o arquivo:', erro);
        return [];
    }
}

// Salvar dados
function salvarDados(dados) {
    try {
        fs.writeFileSync(caminhoArquivo, JSON.stringify(dados, null, 2));
    } catch (erro) {
        console.error('Erro ao salvar o arquivo:', erro);
    }
}

// ==========================
// ROTAS GET
// ==========================

// 🔹 Todos os dados
app.get('/dados', (req, res) => {
    const dados = lerDados();
    res.json(dados);
});

// 🔹 Buscar por ID
app.get('/dados/:id', (req, res) => {
    const dados = lerDados();
    const id = parseInt(req.params.id);

    const item = dados.find(d => d.id === id);

    if (!item) {
        return res.status(404).json({ erro: 'Item não encontrado' });
    }

    res.json(item);
});

// 🔹 Filtrar por categoria
app.get('/categoria/:categoria', (req, res) => {
    const dados = lerDados();
    const categoria = req.params.categoria;

    const filtrados = dados.filter(d => d.categoria === categoria);

    res.json(filtrados);
});

// 🔹 Busca por texto
app.get('/buscar', (req, res) => {
    const dados = lerDados();
    const termo = req.query.q?.toLowerCase();

    if (!termo) {
        return res.status(400).json({ erro: 'Informe ?q=termo' });
    }

    const resultado = dados.filter(d =>
        d.titulo?.toLowerCase().includes(termo) ||
        d.descricao?.toLowerCase().includes(termo) ||
        d.palavrasChave?.some(p => p.toLowerCase().includes(termo))
    );

    res.json(resultado);
});

// ==========================
// ROTAS POST
// ==========================

// 🔹 Criar novo item
app.post('/dados', (req, res) => {
    const dados = lerDados();
    const novo = req.body;

    // Validação básica
    if (!novo.titulo || !novo.categoria) {
        return res.status(400).json({ erro: 'titulo e categoria são obrigatórios' });
    }

    // Gerar ID único
    const maxId = dados.length > 0 ? Math.max(...dados.map(d => d.id)) : 0;
    novo.id = maxId + 1;

    dados.push(novo);
    salvarDados(dados);

    res.status(201).json(novo);
});

// ==========================
// ROTAS PUT
// ==========================

// 🔹 Atualizar item
app.put('/dados/:id', (req, res) => {
    const dados = lerDados();
    const id = parseInt(req.params.id);

    const index = dados.findIndex(d => d.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: 'Item não encontrado' });
    }

    dados[index] = { ...dados[index], ...req.body, id };

    salvarDados(dados);

    res.json(dados[index]);
});

// ==========================
// ROTAS DELETE
// ==========================

// 🔹 Remover item
app.delete('/dados/:id', (req, res) => {
    const dados = lerDados();
    const id = parseInt(req.params.id);

    const novosDados = dados.filter(d => d.id !== id);

    if (dados.length === novosDados.length) {
        return res.status(404).json({ erro: 'Item não encontrado' });
    }

    salvarDados(novosDados);

    res.json({ mensagem: 'Item removido com sucesso' });
});

// ==========================
// SERVIDOR
// ==========================

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});