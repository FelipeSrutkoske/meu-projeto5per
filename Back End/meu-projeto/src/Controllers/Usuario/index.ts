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

// 🟢 Buscar todos os usuários
export function getAllUsuarios(): Promise<UsuarioDTO[]> {
  return UsuarioDAO.getAllUsuarios();
}

// 🟢 Buscar usuário por ID
export function getUsuarioPorId(id: number): Promise<UsuarioDTO | null> {
    return UsuarioDAO.getUsuarioById(id);
  }  

// 🔵 Cadastrar novo usuário com senha criptografada
export async function gravaNovoUsuario(usuarioCorpo: UsuarioCorpo): Promise<string> {
  // Validações
  if (!validarEmail(usuarioCorpo.email)) return "Email inválido";
  if (!validarCPF(usuarioCorpo.cpf)) return "CPF inválido";
  if (!validarSenha(usuarioCorpo.senha)) return "Senha fraca";

  // Criptografar senha
  const senhaCriptografada = await bcrypt.hash(usuarioCorpo.senha, 10);

  // Criar DTO
  const usuario = new UsuarioDTO(null, usuarioCorpo.nome, usuarioCorpo.sobrenome, usuarioCorpo.email, senhaCriptografada, usuarioCorpo.cpf);

  return UsuarioDAO.gravaNovoUsuario(usuario);
}

// 🟠 Atualizar usuário (não permite mudar email)
export async function atualizaUsuario(usuarioCorpo: UsuarioCorpo): Promise<string> {
  const usuarioExistente = await UsuarioDAO.getUsuarioById(usuarioCorpo.idusuario!);

  if (!usuarioExistente) return "Usuário não encontrado";

  // Garantir que o email não seja alterado
  usuarioCorpo.email = usuarioExistente.email;

  const idusuario = usuarioCorpo.idusuario ?? null;  // Se idusuario for undefined, atribui null
  const usuario = new UsuarioDTO(idusuario, usuarioCorpo.nome, usuarioCorpo.sobrenome, usuarioCorpo.email, usuarioExistente.senha, usuarioCorpo.cpf);

  return UsuarioDAO.atualizaUsuario(usuario);
}

// 🔴 Excluir usuário
export function removerUsuario(id: number): Promise<string> {
  return UsuarioDAO.removerUsuario(id);
}

// 🔑 Login de usuário
export async function loginUsuario(email: string, senha: string): Promise<string | { token: string }> {
    try {
      // Buscar o usuário pelo e-mail
      const usuario = await UsuarioDAO.getUsuarioByEmail(email);
      
      if (!usuario) {
        return "Usuário não encontrado";
      }
  
      // Comparar a senha fornecida com a senha criptografada no banco
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return "Senha inválida";
      }
  
      // Gerar o token JWT
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
  

// 📌 Funções auxiliares para validações
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


