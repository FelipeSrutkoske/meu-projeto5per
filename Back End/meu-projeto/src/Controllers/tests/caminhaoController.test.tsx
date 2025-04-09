import { gravaNovoCaminhao, getCaminhaoPorId } from "../Caminhao";
import { CaminhaoDAO } from "../../DAO/Caminhao";

// Mock da DAO
jest.mock("../../DAO/Caminhao", () => ({
  CaminhaoDAO: {
    gravaNovoCaminhao: jest.fn().mockResolvedValue("Caminhão cadastrado com sucesso!"),
    getCaminhaoById: jest.fn()
  }
}));

describe("Testes do Controller de Caminhão", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve cadastrar caminhão com sucesso", async () => {
    const novoCaminhao = {
      modelo: "Volvo FH",
      placa: "ABC1234",
      ano: "2021",
      ipvaPago: true
    };

    const resultado = await gravaNovoCaminhao(novoCaminhao);
    expect(CaminhaoDAO.gravaNovoCaminhao).toHaveBeenCalledTimes(1);
    expect(resultado).toBe("Caminhão cadastrado com sucesso!");
  });

  it("deve retornar caminhão pelo ID", async () => {
    const caminhaoMock = {
      idcaminhao: 1,
      modelo: "Scania R450",
      placa: "DEF5678",
      ano: "2020",
      ipvaPago: false
    };

    (CaminhaoDAO.getCaminhaoById as jest.Mock).mockResolvedValue(caminhaoMock);

    const resultado = await getCaminhaoPorId(1);
    expect(CaminhaoDAO.getCaminhaoById).toHaveBeenCalledWith(1);
    expect(resultado).toEqual(caminhaoMock);
  });
});
