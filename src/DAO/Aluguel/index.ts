import { RowDataPacket } from "mysql2";
import { getConnection } from "../../database";
import { AluguelDTO } from "../../DTO/Aluguel";

interface AluguelRow extends RowDataPacket {
  idaluguel: number;
  idusuario: number;
  idcaminhao: number;
  dataInicio: string;
  dataFim: string;
  valorTotal: number;
}

export class AluguelDAO {
  static async listarAlugueis(): Promise<AluguelDTO[]> {
    let conexao;
    try {
      conexao = await getConnection();
      const [linhas] = await conexao.query<AluguelRow[]>(
        "SELECT * FROM aluguel"
      );

      return linhas.map(
        (linha) =>
          new AluguelDTO(
            linha.idaluguel,
            linha.idusuario,
            linha.idcaminhao,
            linha.dataInicio,
            linha.dataFim,
            linha.valorTotal
          )
      );
    } catch (erro) {
      console.log(erro);
      throw new Error("Erro ao buscar aluguéis.");
    }
  }

  static async buscarAluguelPorId(id: number): Promise<AluguelDTO> {
    let conexao;
    try {
      conexao = await getConnection();
      const [linhas] = await conexao.query<AluguelRow[]>(
        "SELECT * FROM aluguel WHERE idaluguel = ?",
        [id]
      );

      if (linhas.length === 0) {
        throw new Error("Aluguel não encontrado.");
      }

      const aluguel = linhas[0];
      return new AluguelDTO(
        aluguel.idaluguel,
        aluguel.idusuario,
        aluguel.idcaminhao,
        aluguel.dataInicio,
        aluguel.dataFim,
        aluguel.valorTotal
      );
    } catch (erro) {
      console.log(erro);
      throw new Error("Erro ao buscar aluguel.");
    }
  }

  static async cadastrarAluguel(novoAluguel: AluguelDTO): Promise<string> {
    let conexao;
    try {
      conexao = await getConnection();
      await conexao.query(
        `INSERT INTO aluguel (idusuario, idcaminhao, dataInicio, dataFim, valorTotal)
         VALUES (?, ?, ?, ?, ?)`,
        [
          novoAluguel.idusuario,
          novoAluguel.idcaminhao,
          novoAluguel.dataInicio,
          novoAluguel.dataFim,
          novoAluguel.valorTotal
        ]
      );
      return "Aluguel cadastrado com sucesso.";
    } catch (erro) {
      console.log(erro);
      return "Erro ao cadastrar aluguel.";
    }
  }

  static async atualizarAluguel(aluguel: AluguelDTO): Promise<string> {
    let conexao;
    try {
      conexao = await getConnection();

      const aluguelExistente = await this.buscarAluguelPorId(aluguel.idaluguel!);
      if (!aluguelExistente) {
        throw new Error("Aluguel não encontrado para atualização.");
      }

      await conexao.query(
        `UPDATE aluguel 
         SET idusuario = ?, idcaminhao = ?, dataInicio = ?, dataFim = ?, valorTotal = ?
         WHERE idaluguel = ?`,
        [
          aluguel.idusuario,
          aluguel.idcaminhao,
          aluguel.dataInicio,
          aluguel.dataFim,
          aluguel.valorTotal,
          aluguel.idaluguel
        ]
      );
      return "Aluguel atualizado com sucesso.";
    } catch (erro) {
      console.log(erro);
      return "Erro ao atualizar aluguel.";
    }
  }

  static async deletarAluguel(id: number): Promise<string> {
    let conexao;
    try {
      conexao = await getConnection();
      const [resultado] = await conexao.query(
        "DELETE FROM aluguel WHERE idaluguel = ?",
        [id]
      );

      if ((resultado as any).affectedRows === 0) {
        return `Nenhum aluguel encontrado com o ID ${id}`;
      }

      return "Aluguel deletado com sucesso.";
    } catch (erro) {
      console.log(erro);
      return "Erro ao deletar aluguel.";
    }
  }
}

