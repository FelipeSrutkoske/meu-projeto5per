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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Caminhao_1 = require("../../Controllers/Caminhao");
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, Caminhao_1.getAllCaminhoes)());
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const caminhaoId = Number(req.params.id);
    res.json(yield (0, Caminhao_1.getCaminhaoPorId)(caminhaoId));
}));
router.post("/novo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const caminhaoCorpo = req.body;
    res.json(yield (0, Caminhao_1.gravaNovoCaminhao)(caminhaoCorpo));
}));
router.put("/atualizar", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const caminhaoCorpo = req.body;
    res.json(yield (0, Caminhao_1.atualizaCaminhao)(caminhaoCorpo));
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const caminhaoId = Number(req.params.id);
    res.json(yield (0, Caminhao_1.deletarCaminhao)(caminhaoId));
}));
exports.default = router;
