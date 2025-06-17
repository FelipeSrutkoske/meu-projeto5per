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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioDAO = void 0;
const database_1 = require("../../database");
const usuario_1 = require("../../DTO/usuario");
class UsuarioDAO {
    static getAllUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            let connection;
            try {
                connection = yield (0, database_1.getConnection)();
                const [rows] = yield connection.query("SELECT * FROM usuario");
                return rows.map((user) => new usuario_1.UsuarioDTO(user.idusuario, user.nome, user.sobrenome, user.email, user.senha, user.cpf));
            }
            catch (error) {
                console.log(error);
                throw new Error("Falha ao buscar usuários");
            }
        });
    }
    static getUsuarioById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let connection;
            try {
                connection = yield (0, database_1.getConnection)();
                const [rows] = yield connection.query("SELECT * FROM usuario WHERE idusuario = ?", [id]);
                if (rows.length === 0) {
                    return null;
                }
                const usuario = rows[0];
                return new usuario_1.UsuarioDTO(usuario.idusuario, usuario.nome, usuario.sobrenome, usuario.email, usuario.senha, usuario.cpf);
            }
            catch (error) {
                console.log(error);
                throw new Error("Falha ao buscar o usuário");
            }
        });
    }
    static gravaNovoUsuario(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            let connection;
            try {
                connection = yield (0, database_1.getConnection)();
                yield connection.query("INSERT INTO usuario (nome, sobrenome, email, senha, cpf) VALUES (?, ?, ?, ?, ?)", [usuario.nome, usuario.sobrenome, usuario.email, usuario.senha, usuario.cpf]);
                return "Usuário cadastrado com sucesso";
            }
            catch (error) {
                console.log(error);
                throw new Error("Não foi possível cadastrar o usuário");
            }
        });
    }
    static atualizaUsuario(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            let connection;
            try {
                connection = yield (0, database_1.getConnection)();
                const usuarioExistente = yield this.getUsuarioById(usuario.idusuario);
                if (!usuarioExistente) {
                    throw new Error(`Não existe nenhum usuário com este ID: ${usuario.idusuario}`);
                }
                yield connection.query("UPDATE usuario SET nome = ?, sobrenome = ?, email = ?, senha = ?, cpf = ? WHERE idusuario = ?", [
                    usuario.nome,
                    usuario.sobrenome,
                    usuario.email,
                    usuario.senha,
                    usuario.cpf,
                    usuario.idusuario,
                ]);
                return "Usuário atualizado com sucesso";
            }
            catch (error) {
                console.log(error);
                return "Não foi possível atualizar o usuário";
            }
        });
    }
    static removerUsuario(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let connection;
            try {
                connection = yield (0, database_1.getConnection)();
                yield connection.query("DELETE FROM usuario WHERE idusuario = ?", [id]);
                return "Usuário removido com sucesso";
            }
            catch (error) {
                console.log(error);
                return "Não foi possível remover o usuário";
            }
        });
    }
    static getUsuarioByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let connection;
            try {
                connection = yield (0, database_1.getConnection)();
                const [rows] = yield connection.query("SELECT * FROM usuario WHERE email = ?", [email]);
                if (rows.length === 0) {
                    return null;
                }
                const usuario = rows[0];
                return new usuario_1.UsuarioDTO(usuario.idusuario, usuario.nome, usuario.sobrenome, usuario.email, usuario.senha, usuario.cpf);
            }
            catch (error) {
                console.log(error);
                throw new Error("Falha ao buscar o usuário pelo e-mail");
            }
        });
    }
    static getUsuariosPaginados(limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            let connection;
            try {
                connection = yield (0, database_1.getConnection)();
                const [rows] = yield connection.query("SELECT * FROM usuario LIMIT ? OFFSET ?", [limit, offset]);
                return rows.map(row => new usuario_1.UsuarioDTO(row.idusuario, row.nome, row.sobrenome, row.email, row.senha, row.cpf));
            }
            catch (error) {
                console.log(error);
                throw new Error("Falha ao buscar os usuários com paginação");
            }
            finally {
                if (connection)
                    yield connection.end();
            }
        });
    }
}
exports.UsuarioDAO = UsuarioDAO;
