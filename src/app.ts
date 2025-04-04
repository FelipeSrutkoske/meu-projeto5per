import express from "express";
import usuarioRoutes from "./Routes/Usuario";

const app = express();

app.use(express.json({ limit: "50mb"}));

app.use("/usuarios", usuarioRoutes);

app.listen(3000, () => console.log("Servidor iniciado"));

