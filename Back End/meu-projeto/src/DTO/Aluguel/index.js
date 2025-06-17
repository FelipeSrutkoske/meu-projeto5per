"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AluguelDTO = void 0;
class AluguelDTO {
    constructor(idaluguel, idusuario, idcaminhao, dataInicio, dataFim, valorTotal) {
        this.idaluguel = idaluguel;
        this.idusuario = idusuario;
        this.idcaminhao = idcaminhao;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.valorTotal = valorTotal;
    }
}
exports.AluguelDTO = AluguelDTO;
