import express from "express";
import usuarioRoutes from "./Routes/Usuario";
import caminhaoRoutes from "./Routes/Caminhao"; // <- novo import da rota de caminhões

const app = express();

app.use(express.json({ limit: "50mb" }));

app.use("/usuarios", usuarioRoutes);
app.use("/caminhoes", caminhaoRoutes); // <- adicionando a rota dos caminhões

app.listen(3000, () => console.log("Servidor iniciado na porta 3000"));
