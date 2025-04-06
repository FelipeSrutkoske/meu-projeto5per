import { AluguelDTO } from "../../DTO/Aluguel";
import { AluguelDAO } from "../../DAO/Aluguel";

export function getTodosAlugueis(): Promise<AluguelDTO[]> {
  return AluguelDAO.listarAlugueis();
}

export function getAluguelPorId(id: number): Promise<AluguelDTO> {
  return AluguelDAO.buscarAluguelPorId(id);
}

interface AluguelCorpo {
  idusuario: number;
  idcaminhao: number;
  dataInicio: string;
  dataFim: string;
  valorTotal: number;
}

export function gravaNovoAluguel(corpo: AluguelCorpo): Promise<string> {
  const aluguel = new AluguelDTO(
    null,
    corpo.idusuario,
    corpo.idcaminhao,
    corpo.dataInicio,
    corpo.dataFim,
    corpo.valorTotal
  );
  return AluguelDAO.cadastrarAluguel(aluguel);
}

export function atualizaAluguel(corpo: AluguelCorpo & { idaluguel: number }): Promise<string> {
  const aluguel = new AluguelDTO(
    corpo.idaluguel,
    corpo.idusuario,
    corpo.idcaminhao,
    corpo.dataInicio,
    corpo.dataFim,
    corpo.valorTotal
  );
  return AluguelDAO.atualizarAluguel(aluguel);
}

export function deletarAluguel(id: number): Promise<string> {
  return AluguelDAO.deletarAluguel(id);
}
