import { RowDataPacket } from "mysql2";
import { getConnection } from "../../database";
import { UsuarioDTO } from "../../DTO/usuario";

interface UsuarioRow extends RowDataPacket {
  idusuario: number;
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  cpf: string;
}

export class UsuarioDAO {
  static async getAllUsuarios(): Promise<UsuarioDTO[]> {
    let connection;
    try {
      connection = await getConnection();
      const [rows] = await connection.query<UsuarioRow[]>(
        "SELECT * FROM usuario"
      );
      return rows.map(
        (user) =>
          new UsuarioDTO(
            user.idusuario,
            user.nome,
            user.sobrenome,
            user.email,
            user.senha,
            user.cpf
          )
      );
    } catch (error) {
      console.log(error);
      throw new Error("Falha ao buscar usuários");
    }
  }

  static async getUsuarioById(id: number): Promise<UsuarioDTO | null> {
    let connection;
    try {
      connection = await getConnection();
      const [rows] = await connection.query<UsuarioRow[]>(
        "SELECT * FROM usuario WHERE idusuario = ?",
        [id]
      );

      if (rows.length === 0) {
        return null; 
      }

      const usuario = rows[0];
      return new UsuarioDTO(
        usuario.idusuario,
        usuario.nome,
        usuario.sobrenome,
        usuario.email,
        usuario.senha,
        usuario.cpf
      );
    } catch (error) {
      console.log(error);
      throw new Error("Falha ao buscar o usuário");
    }
  }

  static async gravaNovoUsuario(usuario: UsuarioDTO): Promise<string> {
    let connection;
    try {
      connection = await getConnection();
      await connection.query(
        "INSERT INTO usuario (nome, sobrenome, email, senha, cpf) VALUES (?, ?, ?, ?, ?)",
        [usuario.nome, usuario.sobrenome, usuario.email, usuario.senha, usuario.cpf]
      );
      return "Usuário cadastrado com sucesso";
    } catch (error) {
      console.log(error);
      throw new Error("Não foi possível cadastrar o usuário");
    }
  }

  static async atualizaUsuario(usuario: UsuarioDTO): Promise<string> {
    let connection;
    try {
      connection = await getConnection();
      const usuarioExistente = await this.getUsuarioById(usuario.idusuario!);

      if (!usuarioExistente) {
        throw new Error(`Não existe nenhum usuário com este ID: ${usuario.idusuario}`);
      }

      await connection.query(
        "UPDATE usuario SET nome = ?, sobrenome = ?, email = ?, senha = ?, cpf = ? WHERE idusuario = ?",
        [
          usuario.nome,
          usuario.sobrenome,
          usuario.email,
          usuario.senha,
          usuario.cpf,
          usuario.idusuario,
        ]
      );
      return "Usuário atualizado com sucesso";
    } catch (error) {
      console.log(error);
      return "Não foi possível atualizar o usuário";
    }
  }

  static async removerUsuario(id: number): Promise<string> {
    let connection;
    try {
      connection = await getConnection();
      await connection.query("DELETE FROM usuario WHERE idusuario = ?", [id]);
      return "Usuário removido com sucesso";
    } catch (error) {
      console.log(error);
      return "Não foi possível remover o usuário";
    }
  }

  static async getUsuarioByEmail(email: string) {
    let connection;
    try {
      connection = await getConnection();
      const [rows] = await connection.query<UsuarioRow[]>(
        "SELECT * FROM usuario WHERE email = ?", 
        [email]
      );
  
      if (rows.length === 0) {
          return null;
      }
  
      const usuario = rows[0];
      return new UsuarioDTO(usuario.idusuario, usuario.nome, usuario.sobrenome, usuario.email, usuario.senha, usuario.cpf);
    } catch (error) {
      console.log(error);
      throw new Error("Falha ao buscar o usuário pelo e-mail");
    }
  }

  static async getUsuariosPaginados(limit: number, offset: number): Promise<UsuarioDTO[]> {
    let connection;
    try {
      connection = await getConnection();
      const [rows] = await connection.query<UsuarioRow[]>(
        "SELECT * FROM usuario LIMIT ? OFFSET ?",
        [limit, offset]
      );
  
      return rows.map(row => new UsuarioDTO(
        row.idusuario,
        row.nome,
        row.sobrenome,
        row.email,
        row.senha,
        row.cpf
      ));
    } catch (error) {
      console.log(error);
      throw new Error("Falha ao buscar os usuários com paginação");
    } finally {
      if (connection) await connection.end(); 
    }
  }
  
  
}



