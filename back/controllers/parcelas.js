const db = require("../db/conn");

// Função para buscar todos as parcelas

module.exports.getParcelas = async (_, res) => {
    const query = "SELECT * FROM parcelas";

    try {
        const [rows, fields] = await db.execute(query);
        // Verificar se tem Parcela cadastrada
        if (rows.length === 0) {
            return res.status(404).json({ error: "Nenhuma Parcela cadastrada" });
        }
        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao buscar Parcelas" });
    }
};


// Função para buscar uma parcela
module.exports.getParcela = async (req, res) => {
    const { id } = req.body;
    const query = "SELECT * FROM parcelas WHERE id = ?";

    try {
        const [rows] = await db.query(query, [id]);

        // Verificar se a Parcela foi encontrada
        if (rows.length === 0) {
            return res.status(404).json({ error: "Parcela não encontrado" });
        }

        // Se a Parcela foi encontrado, retornar os dados
        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao buscar OS" });
    }
};

// Função para buscar uma parcela por id_os
module.exports.getParcelaOs = async (req, res) => {
    const { os_id } = req.body;
    const query = "SELECT * FROM parcelas WHERE os_id = ?";

    try {
        const [rows] = await db.query(query, [os_id]);

        // Verificar se a parcelas foi encontrada
        if (rows.length === 0) {
            return res.status(404).json({ error: "Parcela não encontrada" });
        }

        // Se a parcelas foi encontrado, retornar os dados
        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao buscar Parcela" });
    }
};




// Função para deletar uma Parcela
module.exports.deleteParcela = async (req, res) => {
    const { id } = req.body;
    const queryVerificar = "SELECT * FROM parcelas WHERE id = ?";
    const queryDeletar = "DELETE FROM parcelas WHERE id = ?";

    try {
        // Verificar se a Parcela existe
        const [rows] = await db.query(queryVerificar, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Parcela não encontrada" });
        }

        // Se a Parcela existe, então deletá-la
        await db.query(queryDeletar, [id]);
        return res.status(200).json({ message: "Parcela deletada com sucesso" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao deletar a Parcela" });
    }
};
