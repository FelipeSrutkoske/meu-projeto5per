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
const Aluguel_1 = require("../../Controllers/Aluguel");
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, Aluguel_1.getTodosAlugueis)());
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idAluguel = Number(req.params.id);
    res.json(yield (0, Aluguel_1.getAluguelPorId)(idAluguel));
}));
router.post("/novo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const corpo = req.body;
    res.json(yield (0, Aluguel_1.gravaNovoAluguel)(corpo));
}));
router.put("/atualizar", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const corpo = req.body;
    res.json(yield (0, Aluguel_1.atualizaAluguel)(corpo));
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idAluguel = Number(req.params.id);
    res.json(yield (0, Aluguel_1.deletarAluguel)(idAluguel));
}));
exports.default = router;
