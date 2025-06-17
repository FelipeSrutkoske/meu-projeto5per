"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCaminhoes = getAllCaminhoes;
exports.getCaminhaoPorId = getCaminhaoPorId;
exports.gravaNovoCaminhao = gravaNovoCaminhao;
exports.atualizaCaminhao = atualizaCaminhao;
exports.deletarCaminhao = deletarCaminhao;
const Caminhao_1 = require("../../DTO/Caminhao");
const Caminhao_2 = require("../../DAO/Caminhao");
function getAllCaminhoes() {
    return Caminhao_2.CaminhaoDAO.getAllCaminhoes();
}
function getCaminhaoPorId(id) {
    return Caminhao_2.CaminhaoDAO.getCaminhaoById(id);
}
function gravaNovoCaminhao(caminhaoCorpo) {
    const caminhao = new Caminhao_1.CaminhaoDTO(null, caminhaoCorpo.modelo, caminhaoCorpo.placa, caminhaoCorpo.ano, caminhaoCorpo.ipvaPago);
    return Caminhao_2.CaminhaoDAO.gravaNovoCaminhao(caminhao);
}
function atualizaCaminhao(caminhaoCorpo) {
    const caminhao = new Caminhao_1.CaminhaoDTO(caminhaoCorpo.idcaminhao, caminhaoCorpo.modelo, caminhaoCorpo.placa, caminhaoCorpo.ano, caminhaoCorpo.ipvaPago);
    return Caminhao_2.CaminhaoDAO.atualizarCaminhao(caminhao);
}
function deletarCaminhao(id) {
    return Caminhao_2.CaminhaoDAO.deletarCaminhao(id);
}
