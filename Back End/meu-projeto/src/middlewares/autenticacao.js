"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autenticarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const autenticarToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
    console.log("🟡 Token recebido:", token);
    if (!token) {
        console.warn("⛔ Token não fornecido");
        res.status(401).json({ erro: "Token não fornecido" });
        return;
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("❌ Erro na verificação do token:", err);
        }
        if (!decoded || typeof decoded !== "object") {
            console.warn("⚠️ Token inválido ou malformado:", decoded);
            res.status(403).json({ erro: "Token inválido" });
            return;
        }
        const payload = decoded;
        req.usuario = {
            id: payload.id,
            email: payload.email,
        };
        console.log("✅ Usuário autenticado:", req.usuario);
        next();
    });
};
exports.autenticarToken = autenticarToken;
