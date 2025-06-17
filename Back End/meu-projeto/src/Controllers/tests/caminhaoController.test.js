"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Caminhao_1 = require("../Caminhao");
const Caminhao_2 = require("../../DAO/Caminhao");
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
    it("deve cadastrar caminhão com sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        const novoCaminhao = {
            modelo: "Volvo FH",
            placa: "ABC1234",
            ano: "2021",
            ipvaPago: true
        };
        const resultado = yield (0, Caminhao_1.gravaNovoCaminhao)(novoCaminhao);
        expect(Caminhao_2.CaminhaoDAO.gravaNovoCaminhao).toHaveBeenCalledTimes(1);
        expect(resultado).toBe("Caminhão cadastrado com sucesso!");
    }));
    it("deve retornar caminhão pelo ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const caminhaoMock = {
            idcaminhao: 1,
            modelo: "Scania R450",
            placa: "DEF5678",
            ano: "2020",
            ipvaPago: false
        };
        Caminhao_2.CaminhaoDAO.getCaminhaoById.mockResolvedValue(caminhaoMock);
        const resultado = yield (0, Caminhao_1.getCaminhaoPorId)(1);
        expect(Caminhao_2.CaminhaoDAO.getCaminhaoById).toHaveBeenCalledWith(1);
        expect(resultado).toEqual(caminhaoMock);
    }));
});
