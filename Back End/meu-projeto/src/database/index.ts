import mysql12 from "mysql2/promise";
import { Connection } from "mysql2/typings/mysql/lib/Connection";
import dotenv from "dotenv";
dotenv.config();

export async function getConnection() {
    return await mysql12.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
}
