const db = require("../db/conn");

// Função para buscar todos os usuários

module.exports.getOss = async (_, res) => {
    const query = "SELECT * FROM os";

    try {
        const [rows, fields] = await db.execute(query);
        // Verificar se tem os cadastrada
        if (rows.length === 0) {
            return res.status(404).json({ error: "Nenhum OS cadastrado" });
        }
        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao buscar OS's" });
    }
};

// Função para criar uma nova os
module.exports.createOs = async (req, res) => {
    const { servico_id, cliente_id, funcionario_id, convenio_id, QTparcelas, valorServico, valorDesconto, dataServico, horaServico, salaServico, status, parcelas } = req.body;
    const insertOsQuery = "INSERT INTO os (servico_id, cliente_id, funcionario_id, convenio_id, QTparcelas, valorServico, valorDesconto, dataServico, horaServico, salaServico, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const insertFinanceiroQuery = "INSERT INTO parcelas (os_id, parcela, valorParcela, dataPagamento, status) VALUES (?, ?, ?, ?, ?)";

    try {
        // Inserir na tabela 'os'
        const [osResult] = await db.query(insertOsQuery, [servico_id, cliente_id, funcionario_id, convenio_id, QTparcelas, valorServico, valorDesconto, dataServico, horaServico, salaServico, status]);

        // Recuperar o ID da OS recém-criada
        const osId = osResult.insertId;

        // Inserir na tabela 'financeiro' para cada parcela
        for (const parcela of parcelas) {
            await db.query(insertFinanceiroQuery, [osId, parcela.parcela, parcela.valorParcela, parcela.dataPagamento, parcela.status]);
        }

        return res.status(201).json({ message: `OS criada com sucesso` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao criar OS" });
    }
};

// Função para buscar um usuário
module.exports.getOs = async (req, res) => {
    const { id } = req.body;
    const query = "SELECT * FROM os WHERE id = ?";

    try {
        const [rows] = await db.query(query, [id]);

        // Verificar se a OS foi encontrada
        if (rows.length === 0) {
            return res.status(404).json({ error: "OS não encontrado" });
        }

        // Se a OS foi encontrado, retornar os dados
        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao buscar OS" });
    }
};

// Função para deletar uma OS
module.exports.deleteOS = async (req, res) => {
    const { id } = req.body;
    const queryVerificar = "SELECT * FROM os WHERE id = ?";
    const queryDeletar = "DELETE FROM os WHERE id = ?";

    try {
        // Verificar se a OS existe
        const [rows] = await db.query(queryVerificar, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "OS não encontrada" });
        }

        // Se a OS existe, então deletá-la
        await db.query(queryDeletar, [id]);
        return res.status(200).json({ message: "OS deletada com sucesso" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao deletar a OS" });
    }
};
