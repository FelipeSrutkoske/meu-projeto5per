export class UsuarioDTO { 
    idusuario: number | null;
    nome: string; 
    sobrenome: string; 
    email: string;
    senha: string;
    cpf: string;

    constructor(idusuario: number | null, nome: string, sobrenome: string, email: string, senha: string, cpf: string) {
        this.idusuario = idusuario; 
        this.nome = nome; 
        this.sobrenome = sobrenome;
        this.email = email;
        this.senha = senha;
        this.cpf = cpf;
    }
}
