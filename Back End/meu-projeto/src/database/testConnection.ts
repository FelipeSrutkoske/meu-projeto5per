import { getConnection } from "./index"; // Ajuste o caminho conforme necessário

async function testConnection() {
    try {
        const connection = await getConnection();
        console.log("✅ Conexão com o banco de dados estabelecida com sucesso!");
        connection.end(); // Fecha a conexão
    } catch (error) {
        console.error("❌ Erro ao conectar ao banco de dados:", error);
    }
}

testConnection();
