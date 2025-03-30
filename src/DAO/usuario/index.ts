import { RowDataPacket } from "mysql2";
import { getConnection } from "../../database";
import { UsuarioDTO } from "../../DTO/usuario";

interface UsuarioRow extends RowDataPacket {
  idusuario: number;
  nome: string;
  sobrenome: string;
}

export class UsuarioDAO {
  static async getAllUsuarios() {
    let connection;
    try {
      connection = await getConnection();
      const [rows] = await connection.query<UsuarioRow[]>(
        "SELECT * FROM usuario"
      );
      return rows.map(
        (user) => new UsuarioDTO(user.idusuario, user.nome, user.sobrenome)
      );
    } catch (error) {
      console.log(error);
      throw new Error("Falha ao buscar usuários");
    }
  }

  static async getUsuarioById(id: number) {
    let connection;
    try {
      connection = await getConnection();
      const [rows] = await connection.query<UsuarioRow[]>(
        "SELECT * FROM usuario WHERE idusuario = ?",
        [id]
      );

      if (rows.length === 0) {
        throw new Error("Usuário não encontrado");
      }

      const usuario = rows[0];

      return new UsuarioDTO(usuario.idusuario, usuario.nome, usuario.sobrenome);
    } catch (error) {
      console.log(error);
      throw new Error("Falha ao buscar o usuário");
    }
  }

  static async gravaNovoUsuario(usuario: UsuarioDTO) {
    let connection;
    try {
      connection = await getConnection();
      await connection.query(
        "INSERT INTO usuario (nome, sobrenome) VALUES (?, ?)",
        [usuario.nome, usuario.sobrenome]
      );
      return "Usuário cadastrado com sucesso";
    } catch (error) {
      return "Não foi possível cadastrar o usuário";
    }
  }

  static async atualizaUsuario(usuario: UsuarioDTO) {
    let connection;
    try {
      connection = await getConnection();
      const usuarioExistente = await this.getUsuarioById(usuario.idusuario!);

      if (!usuarioExistente) {
        throw new Error('Não existe nenhum usuário com este ID> ${usuario.idusuario}');
      }

      await connection.query(
        'UPDATE usuario SET nome = ?, sobrenome = ? WHERE idusuario = ?',
        [usuario.nome, usuario.sobrenome, usuario.idusuario]
      );
      return "Usuário atualizado com sucesso";
    } catch (error) {
      return "Não foi possível atualizar o usuário";
    }
  }
}