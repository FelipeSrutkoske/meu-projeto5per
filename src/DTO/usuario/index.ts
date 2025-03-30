export class UsuarioDTO { 
    
    idusuario: number | null;
    nome: string; 
    sobrenome: string; 
    

    constructor(idusuario: number | null, nome: string, sobrenome: string){
        this.idusuario = idusuario; 
        this.nome = nome; 
        this.sobrenome = sobrenome;
    }

}