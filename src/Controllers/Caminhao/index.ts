import { CaminhaoDTO } from "../../DTO/Caminhao";
import { CaminhaoDAO } from "../../DAO/Caminhao";

export function getAllCaminhoes(): Promise<CaminhaoDTO[]> {
  return CaminhaoDAO.getAllCaminhoes();
}

export function getCaminhaoPorId(id: number): Promise<CaminhaoDTO> {
  return CaminhaoDAO.getCaminhaoById(id);
}

interface CaminhaoCorpo {
  idusuario?: number | null;
  modelo: string;
  placa: string;
  ano: string;
  ipvaPago: boolean;
}

export function gravaNovoCaminhao(caminhaoCorpo: CaminhaoCorpo): Promise<string> {
  const caminhao = new CaminhaoDTO(null, caminhaoCorpo.modelo, caminhaoCorpo.placa, caminhaoCorpo.ano, caminhaoCorpo.ipvaPago);
  return CaminhaoDAO.gravaNovoCaminhao(caminhao);
}

export function atualizaCaminhao(caminhaoCorpo: CaminhaoCorpo & { idcaminhao: number }): Promise<string> {
  const caminhao = new CaminhaoDTO(caminhaoCorpo.idcaminhao, caminhaoCorpo.modelo, caminhaoCorpo.placa, caminhaoCorpo.ano, caminhaoCorpo.ipvaPago);
  return CaminhaoDAO.atualizarCaminhao(caminhao);
}

export function deletarCaminhao(id: number): Promise<string> {
  return CaminhaoDAO.deletarCaminhao(id);
}
