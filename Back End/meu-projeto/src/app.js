"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Usuario_1 = __importDefault(require("./Routes/Usuario"));
const Caminhao_1 = __importDefault(require("./Routes/Caminhao"));
const Aluguel_1 = __importDefault(require("./Routes/Aluguel"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "50mb" }));
app.use("/usuarios", Usuario_1.default);
app.use("/caminhoes", Caminhao_1.default);
app.use("/aluguel", Aluguel_1.default);
app.listen(3000, () => console.log("Servidor iniciado na porta 3000"));
