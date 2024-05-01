const mysql = require("mysql2/promise");
require("dotenv").config();

const db_pass = process.env.DB_PASS;
const db_user = process.env.DB_USER;
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const db_name = process.env.DB_NAME;

const pool = mysql.createPool({
    host: db_host,
    user: db_user,
    password: db_pass,
    port: db_port,
    database: db_name,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function createUsuariosTable() {
    try {
        const connection = await pool.getConnection();

        // Verifique se a tabela 'usuarios' existe
        const [rows, fields] = await connection.execute(
            `SHOW TABLES LIKE 'usuarios'`
        );

        // Se a tabela 'usuarios' não existir, crie-a
        if (rows.length === 0) {
            await connection.execute(`
                CREATE TABLE usuarios (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    tipo VARCHAR(100),
                    cpfcnpj VARCHAR(100),
                    nome VARCHAR(100),
                    telefone VARCHAR(100),
                    endereco VARCHAR(100),
                    email VARCHAR(100),
                    senha VARCHAR(100),
                    status VARCHAR(50),
                    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);
            console.log("Tabela 'usuarios' criada com sucesso.");
        }

        // Libere a conexão
        connection.release();
    } catch (error) {
        console.error("Erro ao criar a tabela 'usuarios':", error);
    }
}

async function createServicosTable() {
    try {
        const connection = await pool.getConnection();

        // Verifique se a tabela 'servicos' existe
        const [rows, fields] = await connection.execute(
            `SHOW TABLES LIKE 'servicos'`
        );

        // Se a tabela 'servicos' não existir, crie-a
        if (rows.length === 0) {
            await connection.execute(`
                CREATE TABLE servicos (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nome VARCHAR(100),
                    descricao VARCHAR(100),
                    preco_avulso DECIMAL(10, 2),
                    preco_convenio DECIMAL(10, 2),
                    status VARCHAR(50),
                    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);
            console.log("Tabela 'servicos' criada com sucesso.");
        }

        // Libere a conexão
        connection.release();
    } catch (error) {
        console.error("Erro ao criar a tabela 'servicos':", error);
    }
}

async function createOsTable() {
    try {
        const connection = await pool.getConnection();

        // Verifique se a tabela 'OS' existe
        const [rows, fields] = await connection.execute(
            `SHOW TABLES LIKE 'os'`
        );

        // Se a tabela 'Os' não existir, crie-a
        if (rows.length === 0) {
            await connection.execute(`
                CREATE TABLE os (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    servico_id INT,
                    cliente_id INT,
                    funcionario_id INT,
                    convenio_id INT,
                    QTparcelas INT,
                    valorServico DECIMAL(10, 2),
                    valorDesconto DECIMAL(10, 2),
                    dataServico VARCHAR(50),
                    horaServico VARCHAR(50),
                    salaServico VARCHAR(50),
                    status VARCHAR(50),
                    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (servico_id) REFERENCES servicos(id),
                    FOREIGN KEY (cliente_id) REFERENCES usuarios(id),
                    FOREIGN KEY (funcionario_id) REFERENCES usuarios(id),
                    FOREIGN KEY (convenio_id) REFERENCES usuarios(id)
                )
            `);
            console.log("Tabela 'os' criada com sucesso.");
        }

        // Libere a conexão
        connection.release();
    } catch (error) {
        console.error("Erro ao criar a tabela 'os':", error);
    }
}

async function createParcelasTable() {
    try {
        const connection = await pool.getConnection();

        // Verifique se a tabela 'Parcelas' existe
        const [rows, fields] = await connection.execute(
            `SHOW TABLES LIKE 'parcelas'`
        );

        // Se a tabela 'Parcelas' não existir, crie-a
        if (rows.length === 0) {
            await connection.execute(`
                CREATE TABLE parcelas (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    os_id INT,
                    parcela INT,
                    valorParcela DECIMAL(10, 2),
                    dataPagamento VARCHAR(50),
                    status VARCHAR(50),
                    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (os_id) REFERENCES os(id)
                )
            `);
            console.log("Tabela 'Parcelas' criada com sucesso.");
        }

        // Libere a conexão
        connection.release();
    } catch (error) {
        console.error("Erro ao criar a tabela 'Parcelas':", error);
    }
}

// Chame as funções para criar as tabelas durante a inicialização do banco de dados
createUsuariosTable();
createServicosTable();
createParcelasTable();
createOsTable(); 

console.log("Conectado ao banco!");

module.exports = pool;
