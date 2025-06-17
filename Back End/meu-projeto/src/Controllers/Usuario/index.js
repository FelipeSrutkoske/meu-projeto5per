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
exports.getAllUsuarios = getAllUsuarios;
exports.getUsuarioPorId = getUsuarioPorId;
exports.gravaNovoUsuario = gravaNovoUsuario;
exports.atualizaUsuario = atualizaUsuario;
exports.removerUsuario = removerUsuario;
exports.loginUsuario = loginUsuario;
exports.getUsuariosPaginados = getUsuariosPaginados;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_1 = require("../../DTO/usuario");
const usuario_2 = require("../../DAO/usuario");
function getAllUsuarios() {
    return usuario_2.UsuarioDAO.getAllUsuarios();
}
function getUsuarioPorId(id) {
    return usuario_2.UsuarioDAO.getUsuarioById(id);
}
function gravaNovoUsuario(usuarioCorpo) {
    return __awaiter(this, void 0, void 0, function* () {
        // Validações
        if (!validarEmail(usuarioCorpo.email))
            return "Email inválido";
        if (!validarCPF(usuarioCorpo.cpf))
            return "CPF inválido";
        if (!validarSenha(usuarioCorpo.senha))
            return "Senha fraca";
        const senhaCriptografada = yield bcryptjs_1.default.hash(usuarioCorpo.senha, 10);
        const usuario = new usuario_1.UsuarioDTO(null, usuarioCorpo.nome, usuarioCorpo.sobrenome, usuarioCorpo.email, senhaCriptografada, usuarioCorpo.cpf);
        return usuario_2.UsuarioDAO.gravaNovoUsuario(usuario);
    });
}
function atualizaUsuario(usuarioCorpo) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const usuarioExistente = yield usuario_2.UsuarioDAO.getUsuarioById(usuarioCorpo.idusuario);
        if (!usuarioExistente)
            return "Usuário não encontrado";
        usuarioCorpo.email = usuarioExistente.email;
        const idusuario = (_a = usuarioCorpo.idusuario) !== null && _a !== void 0 ? _a : null;
        const usuario = new usuario_1.UsuarioDTO(idusuario, usuarioCorpo.nome, usuarioCorpo.sobrenome, usuarioCorpo.email, usuarioExistente.senha, usuarioCorpo.cpf);
        return usuario_2.UsuarioDAO.atualizaUsuario(usuario);
    });
}
function removerUsuario(id) {
    return usuario_2.UsuarioDAO.removerUsuario(id);
}
function loginUsuario(email, senha) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usuario = yield usuario_2.UsuarioDAO.getUsuarioByEmail(email);
            if (!usuario) {
                return "Usuário não encontrado";
            }
            const senhaValida = yield bcryptjs_1.default.compare(senha, usuario.senha);
            if (!senhaValida) {
                return "Senha inválida";
            }
            const token = jsonwebtoken_1.default.sign({ id: usuario.idusuario, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return { token };
        }
        catch (error) {
            console.log(error);
            return "Erro ao realizar login";
        }
    });
}
function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validarCPF(cpf) {
    return /^\d{11}$/.test(cpf);
}
function validarSenha(senha) {
    const regexSenhaForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
    return regexSenhaForte.test(senha);
}
function getUsuariosPaginados(limit, offset) {
    return usuario_2.UsuarioDAO.getUsuariosPaginados(limit, offset);
}
