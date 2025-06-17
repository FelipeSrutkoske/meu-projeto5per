import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UsuarioDTO } from "../../DTO/usuario";
import { UsuarioDAO } from "../../DAO/usuario";

interface UsuarioCorpo {
  idusuario?: number | null;
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  cpf: string;
}

export function getAllUsuarios(): Promise<UsuarioDTO[]> {
  return UsuarioDAO.getAllUsuarios();
}

export function getUsuarioPorId(id: number): Promise<UsuarioDTO | null> {
    return UsuarioDAO.getUsuarioById(id);
  }  

export async function gravaNovoUsuario(usuarioCorpo: UsuarioCorpo): Promise<string> {
  // Validações
  if (!validarEmail(usuarioCorpo.email)) return "Email inválido";
  if (!validarCPF(usuarioCorpo.cpf)) return "CPF inválido";
  if (!validarSenha(usuarioCorpo.senha)) return "Senha fraca";

  const senhaCriptografada = await bcrypt.hash(usuarioCorpo.senha, 10);

  const usuario = new UsuarioDTO(null, usuarioCorpo.nome, usuarioCorpo.sobrenome, usuarioCorpo.email, senhaCriptografada, usuarioCorpo.cpf);

  return UsuarioDAO.gravaNovoUsuario(usuario);
}

export async function atualizaUsuario(usuarioCorpo: UsuarioCorpo): Promise<string> {
  const usuarioExistente = await UsuarioDAO.getUsuarioById(usuarioCorpo.idusuario!);

  if (!usuarioExistente) return "Usuário não encontrado";

  usuarioCorpo.email = usuarioExistente.email;

  const idusuario = usuarioCorpo.idusuario ?? null;  
  const usuario = new UsuarioDTO(idusuario, usuarioCorpo.nome, usuarioCorpo.sobrenome, usuarioCorpo.email, usuarioExistente.senha, usuarioCorpo.cpf);

  return UsuarioDAO.atualizaUsuario(usuario);
}

export function removerUsuario(id: number): Promise<string> {
  return UsuarioDAO.removerUsuario(id);
}

export async function loginUsuario(email: string, senha: string): Promise<string | { token: string }> {
    try {
      const usuario = await UsuarioDAO.getUsuarioByEmail(email);
      
      if (!usuario) {
        return "Usuário não encontrado";
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return "Senha inválida";
      }
  
      const token = jwt.sign(
        { id: usuario.idusuario, email: usuario.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );
  
      return { token };
  
    } catch (error) {
      console.log(error);
      return "Erro ao realizar login";
    }
  }
  
function validarEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarCPF(cpf: string): boolean {
  return /^\d{11}$/.test(cpf);
}

function validarSenha(senha: string): boolean {
  const regexSenhaForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
  return regexSenhaForte.test(senha);
}

export function getUsuariosPaginados(limit: number, offset: number): Promise<UsuarioDTO[]> {
  return UsuarioDAO.getUsuariosPaginados(limit, offset);
}


