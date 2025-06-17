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
exports.CaminhaoDAO = void 0;
const database_1 = require("../../database");
const Caminhao_1 = require("../../DTO/Caminhao");
class CaminhaoDAO {
    static getAllCaminhoes() {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, database_1.getConnection)();
                const [linhas] = yield conexao.query("SELECT * FROM caminhao");
                return linhas.map((linha) => new Caminhao_1.CaminhaoDTO(linha.idcaminhao, linha.modelo, linha.placa, linha.ano, linha.ipvaPago));
            }
            catch (erro) {
                console.log(erro);
                throw new Error("Falha ao buscar caminhões");
            }
        });
    }
    static gravaNovoCaminhao(truck) {
        return __awaiter(this, void 0, void 0, function* () {
            let connection;
            try {
                connection = yield (0, database_1.getConnection)();
                yield connection.query("INSERT INTO caminhao (modelo, placa, ano, ipvaPago) VALUES (?, ?, ?, ?)", [truck.modelo, truck.placa, truck.ano, truck.ipvaPago]);
                return "Caminhão cadastrado com sucesso";
            }
            catch (error) {
                console.error(error);
                return "Não foi possível cadastrar o caminhão";
            }
        });
    }
    static getCaminhaoById(idCaminhao) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, database_1.getConnection)();
                const [rows] = yield conexao.query("SELECT * FROM caminhao WHERE idcaminhao = ?", [idCaminhao]);
                if (rows.length === 0) {
                    throw new Error("Caminhão não encontrado");
                }
                const caminhao = rows[0];
                return new Caminhao_1.CaminhaoDTO(caminhao.idcaminhao, caminhao.modelo, caminhao.placa, caminhao.ano, caminhao.ipvaPago);
            }
            catch (erro) {
                console.log(erro);
                throw new Error("Falha ao buscar o caminhão");
            }
        });
    }
    static cadastrarCaminhao(novoCaminhao) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, database_1.getConnection)();
                yield conexao.query("INSERT INTO caminhao (modelo, placa, ano, ipvaPago) VALUES (?, ?, ?, ?, ?)", [
                    novoCaminhao.modelo,
                    novoCaminhao.placa,
                    novoCaminhao.ano,
                    novoCaminhao.ipvaPago,
                ]);
                return "Caminhão cadastrado com sucesso";
            }
            catch (erro) {
                console.log(erro);
                return "Não foi possível cadastrar o caminhão";
            }
        });
    }
    static atualizarCaminhao(caminhaoAtualizado) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, database_1.getConnection)();
                const caminhaoExistente = yield this.getCaminhaoById(caminhaoAtualizado.idcaminhao);
                if (!caminhaoExistente) {
                    throw new Error(`Não existe caminhão com o ID ${caminhaoAtualizado.idcaminhao}`);
                }
                yield conexao.query("UPDATE caminhao SET modelo = ?, placa = ?, ano = ?, ipvaPago = ? WHERE idcaminhao = ?", [
                    caminhaoAtualizado.modelo,
                    caminhaoAtualizado.placa,
                    caminhaoAtualizado.ano,
                    caminhaoAtualizado.ipvaPago,
                    caminhaoAtualizado.idcaminhao,
                ]);
                return "Caminhão atualizado com sucesso";
            }
            catch (erro) {
                console.log(erro);
                return "Não foi possível atualizar o caminhão";
            }
        });
    }
    static deletarCaminhao(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, database_1.getConnection)();
                const [resultado] = yield conexao.query("DELETE FROM caminhao WHERE idcaminhao = ?", [id]);
                if (resultado.affectedRows === 0) {
                    return `Nenhum caminhão encontrado com o ID ${id}`;
                }
                return "Caminhão deletado com sucesso";
            }
            catch (erro) {
                console.log(erro);
                return "Não foi possível deletar o caminhão";
            }
        });
    }
}
exports.CaminhaoDAO = CaminhaoDAO;
