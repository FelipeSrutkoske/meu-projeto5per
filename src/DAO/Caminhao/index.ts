import { RowDataPacket } from "mysql2";
import { getConnection } from "../../database";
import { CaminhaoDTO } from "../../DTO/Caminhao";

interface CaminhaoRow extends RowDataPacket {
  idcaminhao: number;
  modelo: string;
  placa: string;
  ano: string;
  ipvaPago: boolean;
}

export class CaminhaoDAO {
  static async getAllCaminhoes(): Promise<CaminhaoDTO[]> {
    let conexao;
    try {
      conexao = await getConnection();
      const [linhas] = await conexao.query<CaminhaoRow[]>(
        "SELECT * FROM caminhao"
      );

      return linhas.map(
        (linha) =>
          new CaminhaoDTO(
            linha.idcaminhao,
            linha.modelo,
            linha.placa,
            linha.ano,
            linha.ipvaPago
          )
      );
    } catch (erro) {
      console.log(erro);
      throw new Error("Falha ao buscar caminhões");
    }
  }

  static async gravaNovoCaminhao(truck: CaminhaoDTO): Promise<string> {
    let connection;
    try {
      connection = await getConnection();
      await connection.query(
        "INSERT INTO caminhao (modelo, placa, ano, ipvaPago) VALUES (?, ?, ?, ?)",
        [truck.modelo, truck.placa, truck.ano, truck.ipvaPago]
      );
      return "Caminhão cadastrado com sucesso";
    } catch (error) {
      console.error(error);
      return "Não foi possível cadastrar o caminhão";
    }
  }
  

  static async getCaminhaoById(idCaminhao: number): Promise<CaminhaoDTO> {
    let conexao;
    try {
      conexao = await getConnection();
      const [rows] = await conexao.query<CaminhaoRow[]>(
        "SELECT * FROM caminhao WHERE idcaminhao = ?",
        [idCaminhao]
      );

      if (rows.length === 0) {
        throw new Error("Caminhão não encontrado");
      }

      const caminhao = rows[0];

      return new CaminhaoDTO(
        caminhao.idcaminhao,
        caminhao.modelo,
        caminhao.placa,
        caminhao.ano,
        caminhao.ipvaPago
      );
    } catch (erro) {
      console.log(erro);
      throw new Error("Falha ao buscar o caminhão");
    }
  }

  static async cadastrarCaminhao(novoCaminhao: CaminhaoDTO): Promise<string> {
    let conexao;
    try {
      conexao = await getConnection();
      await conexao.query(
        "INSERT INTO caminhao (idusuario, modelo, placa, ano, ipvaPago) VALUES (?, ?, ?, ?, ?)",
        [
          novoCaminhao.modelo,
          novoCaminhao.placa,
          novoCaminhao.ano,
          novoCaminhao.ipvaPago,
        ]
      );
      return "Caminhão cadastrado com sucesso";
    } catch (erro) {
      console.log(erro);
      return "Não foi possível cadastrar o caminhão";
    }
  }

  static async atualizarCaminhao(caminhaoAtualizado: CaminhaoDTO): Promise<string> {
    let conexao;
    try {
      conexao = await getConnection();
      const caminhaoExistente = await this.getCaminhaoById(caminhaoAtualizado.idcaminhao!);

      if (!caminhaoExistente) {
        throw new Error(`Não existe caminhão com o ID ${caminhaoAtualizado.idcaminhao}`);
      }

      await conexao.query(
        "UPDATE caminhao SET idusuario = ?, modelo = ?, placa = ?, ano = ?, ipvaPago = ? WHERE idcaminhao = ?",
        [
          caminhaoAtualizado.modelo,
          caminhaoAtualizado.placa,
          caminhaoAtualizado.ano,
          caminhaoAtualizado.ipvaPago,
          caminhaoAtualizado.idcaminhao,
        ]
      );

      return "Caminhão atualizado com sucesso";
    } catch (erro) {
      console.log(erro);
      return "Não foi possível atualizar o caminhão";
    }
  }
}
