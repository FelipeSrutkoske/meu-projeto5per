"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodosAlugueis = getTodosAlugueis;
exports.getAluguelPorId = getAluguelPorId;
exports.gravaNovoAluguel = gravaNovoAluguel;
exports.atualizaAluguel = atualizaAluguel;
exports.deletarAluguel = deletarAluguel;
const Aluguel_1 = require("../../DTO/Aluguel");
const Aluguel_2 = require("../../DAO/Aluguel");
function getTodosAlugueis() {
    return Aluguel_2.AluguelDAO.listarAlugueis();
}
function getAluguelPorId(id) {
    return Aluguel_2.AluguelDAO.buscarAluguelPorId(id);
}
function gravaNovoAluguel(corpo) {
    const aluguel = new Aluguel_1.AluguelDTO(null, corpo.idusuario, corpo.idcaminhao, corpo.dataInicio, corpo.dataFim, corpo.valorTotal);
    return Aluguel_2.AluguelDAO.cadastrarAluguel(aluguel);
}
function atualizaAluguel(corpo) {
    const aluguel = new Aluguel_1.AluguelDTO(corpo.idaluguel, corpo.idusuario, corpo.idcaminhao, corpo.dataInicio, corpo.dataFim, corpo.valorTotal);
    return Aluguel_2.AluguelDAO.atualizarAluguel(aluguel);
}
function deletarAluguel(id) {
    return Aluguel_2.AluguelDAO.deletarAluguel(id);
}
