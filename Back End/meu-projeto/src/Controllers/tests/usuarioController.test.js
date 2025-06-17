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
const Usuario_1 = require("../../Controllers/Usuario");
const usuario_1 = require("../../DAO/usuario");
jest.mock("../../DAO/usuario");
describe("Testes do Controller de Usuário", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("deve retornar erro para email inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        const resposta = yield (0, Usuario_1.gravaNovoUsuario)({
            nome: "João",
            sobrenome: "Silva",
            email: "emailinvalido",
            senha: "Senha@123",
            cpf: "12345678900"
        });
        expect(resposta).toBe("Email inválido");
    }));
    it("deve retornar erro para CPF inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        const resposta = yield (0, Usuario_1.gravaNovoUsuario)({
            nome: "Maria",
            sobrenome: "Souza",
            email: "maria@example.com",
            senha: "Senha@123",
            cpf: "123"
        });
        expect(resposta).toBe("CPF inválido");
    }));
    it("deve retornar erro para senha fraca", () => __awaiter(void 0, void 0, void 0, function* () {
        const resposta = yield (0, Usuario_1.gravaNovoUsuario)({
            nome: "Pedro",
            sobrenome: "Santos",
            email: "pedro@example.com",
            senha: "fraca",
            cpf: "12345678900"
        });
        expect(resposta).toBe("Senha fraca");
    }));
    it("deve cadastrar usuário com sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        usuario_1.UsuarioDAO.gravaNovoUsuario.mockResolvedValue("Usuário cadastrado com sucesso");
        const resposta = yield (0, Usuario_1.gravaNovoUsuario)({
            nome: "Ana",
            sobrenome: "Lima",
            email: "ana@example.com",
            senha: "Senha@123",
            cpf: "12345678900"
        });
        expect(resposta).toBe("Usuário cadastrado com sucesso");
    }));
});
