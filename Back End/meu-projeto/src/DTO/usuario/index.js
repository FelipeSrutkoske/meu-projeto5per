"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioDTO = void 0;
class UsuarioDTO {
    constructor(idusuario, nome, sobrenome, email, senha, cpf) {
        this.idusuario = idusuario;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.senha = senha;
        this.cpf = cpf;
    }
}
exports.UsuarioDTO = UsuarioDTO;
