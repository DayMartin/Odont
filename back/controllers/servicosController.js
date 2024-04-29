const db = require("../db/conn");

// Função para buscar todos os servicos

module.exports.getService = async (_, res) => {
    const query = "SELECT * FROM servicos";

    try {
        const [rows, fields] = await db.execute(query);

        // Verificar se tem serviço cadastrado
        if (rows.length === 0) {
            return res.status(404).json({ error: "Nenhum serviço cadastrado" });
        }
        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao buscar Serviços" });
    }
};

// Função para criar um novo Serviço
module.exports.createServico = async (req, res) => {
    const { nome, descricao, preco, quantidade } = req.body;
    const query = "INSERT INTO servicos (nome, descricao, preco, quantidade) VALUES (?, ?, ?, ?)";

    try {
        await db.query(query, [nome, descricao, preco, quantidade]);
        return res.status(201).json({ message: "Serviço criado com sucesso" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao criar Serviço" });
    }
};

// Função para buscar um servico
module.exports.getServico = async (req, res) => {
    const { id } = req.body;
    const query = "SELECT * FROM servicos WHERE id = ?";

    try {
        const [rows, fields] = await db.query(query, [id]);

        // Verificar se o serviço foi encontrado
        if (rows.length === 0) {
            return res.status(404).json({ error: "Serviço não encontrado" });
        }
        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao buscar serviço" });
    }
};

// Função para deletar um serviço
module.exports.deleteServico = async (req, res) => {
    const { id } = req.body;
    const queryVerificar = "SELECT * FROM servicos WHERE id = ?";
    const queryDeletar = "DELETE FROM servicos WHERE id = ?";

    try {
        // Verificar se o serviço existe
        const [rows] = await db.query(queryVerificar, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Serviço não encontrado" });
        }

        // Se o serviço existe, então deletá-lo
        await db.query(queryDeletar, [id]);
        return res.status(200).json({ message: "Serviço deletado com sucesso" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao deletar o serviço" });
    }
};
