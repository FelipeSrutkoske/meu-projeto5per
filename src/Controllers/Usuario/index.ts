import { UsuarioDTO } from "../../DTO/usuario"; 
import { UsuarioDAO } from "../../DAO/usuario"; 

export function getAllUsuarios(): Promise<UsuarioDTO[]> {
    return UsuarioDAO.getAllUsuarios();
}

export function getUsuarioPorId(id: number): Promise<UsuarioDTO> {
    return UsuarioDAO.getUsuarioById(id); 
} 

interface UsuarioCorpo { 
    idusuario?: number | null; 
    nome: string; 
    sobrenome: string; 
}

export function gravaNovoUsuario(usuarioCorpo: UsuarioCorpo): Promise<string> { 
    const usuario = new UsuarioDTO(null, usuarioCorpo.nome, usuarioCorpo.sobrenome); 
    return UsuarioDAO.gravaNovoUsuario (usuario); 
}

export function atualizaUsuario (usuarioCorpo: UsuarioCorpo): Promise<string> {
    const usuario = new UsuarioDTO(usuarioCorpo.idusuario!, usuarioCorpo.nome, usuarioCorpo.sobrenome);
    return UsuarioDAO.atualizaUsuario(usuario);
}