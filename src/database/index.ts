import mysql12 from "mysql2/promise";
import { Connection } from "mysql2/typings/mysql/lib/Connection";

export async function getConnection() {
    return await mysql12.createConnection({
        host: "localhost",
        user: "root",
        password: "bdados749!@",
        database: "meu_banco"
    })
}
