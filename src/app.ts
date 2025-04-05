import express from "express";
import usuarioRoutes from "./Routes/Usuario";
import caminhaoRoutes from "./Routes/Caminhao"; 

const app = express();

app.use(express.json({ limit: "50mb" }));

app.use("/usuarios", usuarioRoutes);
app.use("/caminhoes", caminhaoRoutes); 

app.listen(3000, () => console.log("Servidor iniciado na porta 3000"));
