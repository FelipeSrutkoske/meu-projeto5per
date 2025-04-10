import { getConnection } from "./index"; 

async function testConnection() {
    try {
        const connection = await getConnection();
        console.log("Conexão com o banco de dados estabelecida com sucesso!");
        connection.end();
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
    }
}

testConnection();
