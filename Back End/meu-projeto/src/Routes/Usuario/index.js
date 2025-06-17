"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Usuario_1 = require("../../Controllers/Usuario");
const autenticacao_1 = require("../../middlewares/autenticacao");
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield (0, Usuario_1.getAllUsuarios)();
        res.json(usuarios);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao buscar usuários" });
    }
}));
router.get("/paginado", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    try {
        const usuarios = yield (0, Usuario_1.getUsuariosPaginados)(limit, offset);
        res.json(usuarios);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao buscar usuários com paginação" });
    }
}));
router.get("/perfil", autenticacao_1.autenticarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.usuario.id;
        const usuario = yield (0, Usuario_1.getUsuarioPorId)(id);
        if (!usuario) {
            res.status(404).json({ erro: "Usuário não encontrado" });
            return;
        }
        res.json(usuario);
    }
    catch (error) {
        console.error("Erro ao buscar perfil do usuário:", error);
        res.status(500).json({ erro: "Erro ao buscar perfil do usuário" });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const usuario = yield (0, Usuario_1.getUsuarioPorId)(id);
        if (!usuario) {
            res.status(404).json({ erro: "Usuário não encontrado" });
            return;
        }
        res.json(usuario);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao buscar usuário" });
    }
}));
router.post("/novoUsuario", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarioCorpo = req.body;
        const resultado = yield (0, Usuario_1.gravaNovoUsuario)(usuarioCorpo);
        if (typeof resultado === "string" && resultado.includes("inválido")) {
            res.status(400).json({ erro: resultado });
            return;
        }
        res.status(201).json({ mensagem: resultado });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao cadastrar usuário" });
    }
}));
router.put("/atualizaUsuario", autenticacao_1.autenticarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const usuarioId = (_a = req.usuario) === null || _a === void 0 ? void 0 : _a.id;
        if (!usuarioId) {
            res.status(401).json({ erro: "Usuário não autenticado" });
            return;
        }
        const usuarioCorpo = req.body;
        usuarioCorpo.idusuario = usuarioId;
        const resultado = yield (0, Usuario_1.atualizaUsuario)(usuarioCorpo);
        res.json({ mensagem: resultado });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao atualizar usuário" });
    }
}));
router.put("/atualizaUsuarioSemLogin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarioId = req.body.idusuario;
        if (!usuarioId) {
            res.status(400).json({ erro: "ID do usuário não fornecido" });
            return;
        }
        const usuarioCorpo = req.body;
        usuarioCorpo.idusuario = usuarioId;
        const resultado = yield (0, Usuario_1.atualizaUsuario)(usuarioCorpo);
        res.json({ mensagem: resultado });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao atualizar usuário" });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const resultado = yield (0, Usuario_1.removerUsuario)(id);
        res.json({ mensagem: resultado });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao remover usuário" });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, senha } = req.body;
        const resultado = yield (0, Usuario_1.loginUsuario)(email, senha);
        if (typeof resultado === "string") {
            res.status(400).json({ erro: resultado });
        }
        else {
            res.json(resultado);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao realizar login" });
    }
}));
exports.default = router;
