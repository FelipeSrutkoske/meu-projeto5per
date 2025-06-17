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
exports.AluguelDAO = void 0;
const database_1 = require("../../database");
const Aluguel_1 = require("../../DTO/Aluguel");
class AluguelDAO {
    static listarAlugueis() {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, database_1.getConnection)();
                const [linhas] = yield conexao.query("SELECT * FROM aluguel");
                return linhas.map((linha) => new Aluguel_1.AluguelDTO(linha.idaluguel, linha.idusuario, linha.idcaminhao, linha.dataInicio, linha.dataFim, linha.valorTotal));
            }
            catch (erro) {
                console.log(erro);
                throw new Error("Erro ao buscar aluguéis.");
            }
        });
    }
    static buscarAluguelPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, database_1.getConnection)();
                const [linhas] = yield conexao.query("SELECT * FROM aluguel WHERE idaluguel = ?", [id]);
                if (linhas.length === 0) {
                    throw new Error("Aluguel não encontrado.");
                }
                const aluguel = linhas[0];
                return new Aluguel_1.AluguelDTO(aluguel.idaluguel, aluguel.idusuario, aluguel.idcaminhao, aluguel.dataInicio, aluguel.dataFim, aluguel.valorTotal);
            }
            catch (erro) {
                console.log(erro);
                throw new Error("Erro ao buscar aluguel.");
            }
        });
    }
    static cadastrarAluguel(novoAluguel) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, database_1.getConnection)();
                yield conexao.query(`INSERT INTO aluguel (idusuario, idcaminhao, dataInicio, dataFim, valorTotal)
         VALUES (?, ?, ?, ?, ?)`, [
                    novoAluguel.idusuario,
                    novoAluguel.idcaminhao,
                    novoAluguel.dataInicio,
                    novoAluguel.dataFim,
                    novoAluguel.valorTotal
                ]);
                return "Aluguel cadastrado com sucesso.";
            }
            catch (erro) {
                console.log(erro);
                return "Erro ao cadastrar aluguel.";
            }
        });
    }
    static atualizarAluguel(aluguel) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, database_1.getConnection)();
                const aluguelExistente = yield this.buscarAluguelPorId(aluguel.idaluguel);
                if (!aluguelExistente) {
                    throw new Error("Aluguel não encontrado para atualização.");
                }
                yield conexao.query(`UPDATE aluguel 
         SET idusuario = ?, idcaminhao = ?, dataInicio = ?, dataFim = ?, valorTotal = ?
         WHERE idaluguel = ?`, [
                    aluguel.idusuario,
                    aluguel.idcaminhao,
                    aluguel.dataInicio,
                    aluguel.dataFim,
                    aluguel.valorTotal,
                    aluguel.idaluguel
                ]);
                return "Aluguel atualizado com sucesso.";
            }
            catch (erro) {
                console.log(erro);
                return "Erro ao atualizar aluguel.";
            }
        });
    }
    static deletarAluguel(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexao;
            try {
                conexao = yield (0, database_1.getConnection)();
                const [resultado] = yield conexao.query("DELETE FROM aluguel WHERE idaluguel = ?", [id]);
                if (resultado.affectedRows === 0) {
                    return `Nenhum aluguel encontrado com o ID ${id}`;
                }
                return "Aluguel deletado com sucesso.";
            }
            catch (erro) {
                console.log(erro);
                return "Erro ao deletar aluguel.";
            }
        });
    }
}
exports.AluguelDAO = AluguelDAO;
