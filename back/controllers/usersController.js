const db = require("../db/conn");

// Função para buscar todos os usuários

module.exports.getUsers = async (_, res) => {
    const query = "SELECT * FROM usuarios";

    try {
        const [rows, fields] = await db.execute(query);
        // Verificar se tem serviço cadastrado
        if (rows.length === 0) {
            return res.status(404).json({ error: "Nenhum usuário cadastrado" });
        }
        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao buscar usuários" });
    }
};

// Função para criar um novo usuário
module.exports.createUser = async (req, res) => {
    const { tipo, cpfcnpj, nome, telefone, endereco, email, senha } = req.body;
    const query = "INSERT INTO usuarios (tipo, cpfcnpj, nome, telefone, endereco, email, senha) VALUES (?, ?, ?, ?, ?, ?, ?)";

    try {
        // Verifica se o email já está cadastrado
        const emailExistsQuery = "SELECT * FROM usuarios WHERE email = ?";
        const [emailRows] = await db.query(emailExistsQuery, [email]);

        if (emailRows.length > 0) {
            return res.status(400).json({ error: "Usuário já cadastrado" });
        }
        await db.query(query, [tipo, cpfcnpj, nome, telefone, endereco, email, senha]);
        return res.status(201).json({ message: `Usuário criado com sucesso` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao criar usuário" });
    }
};

// Função para buscar um usuário
module.exports.getUser = async (req, res) => {
    const { id } = req.body;
    const query = "SELECT * FROM usuarios WHERE id = ?";

    try {
        const [rows] = await db.query(query, [id]);

        // Verificar se o usuário foi encontrado
        if (rows.length === 0) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        // Se o usuário foi encontrado, retornar os dados
        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao buscar usuário" });
    }
};

// Função para buscar um usuário por tipo
module.exports.getUserTipo = async (req, res) => {
    const { tipo } = req.body;
    const query = "SELECT * FROM usuarios WHERE tipo = ?";

    try {
        const [rows] = await db.query(query, [tipo]);

        // Verificar se o usuário foi encontrado
        if (rows.length === 0) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        // Se o usuário foi encontrado, retornar os dados
        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao buscar usuário" });
    }
};


// Função para deletar um Usuario
module.exports.deleteUser = async (req, res) => {
    const { id } = req.body;
    const queryVerificar = "SELECT * FROM usuarios WHERE id = ?";
    const queryDeletar = "DELETE FROM usuarios WHERE id = ?";

    try {
        // Verificar se o Usuario existe
        const [rows] = await db.query(queryVerificar, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Usuario não encontrado" });
        }

        // Se o Usuario existe, então deletá-lo
        await db.query(queryDeletar, [id]);
        return res.status(200).json({ message: "Usuario deletado com sucesso" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao deletar o Usuario" });
    }
};
