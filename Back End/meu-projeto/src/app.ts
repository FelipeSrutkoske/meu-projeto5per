import express from "express";
import usuarioRoutes from "./Routes/Usuario";
import caminhaoRoutes from "./Routes/Caminhao"; 
import aluguelRoutes from "./Routes/Aluguel";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/usuarios", usuarioRoutes);
app.use("/caminhoes", caminhaoRoutes); 
app.use("/aluguel", aluguelRoutes);

app.listen(3000, () => console.log("Servidor iniciado na porta 3000"));
