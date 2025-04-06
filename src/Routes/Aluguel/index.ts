import express, { Router } from "express";
import {
  getTodosAlugueis,
  getAluguelPorId,
  gravaNovoAluguel,
  atualizaAluguel,
  deletarAluguel,
} from "../../Controllers/Aluguel";

const router: Router = express.Router();

// Buscar todos os aluguéis
router.get("/", async (req, res) => {
  res.json(await getTodosAlugueis());
});

// Buscar aluguel por ID
router.get("/:id", async (req, res) => {
  const idAluguel = Number(req.params.id);
  res.json(await getAluguelPorId(idAluguel));
});

// Cadastrar novo aluguel
router.post("/novo", async (req, res) => {
  const corpo = req.body;
  res.json(await gravaNovoAluguel(corpo));
});

// Atualizar aluguel existente
router.put("/atualizar", async (req, res) => {
  const corpo = req.body;
  res.json(await atualizaAluguel(corpo));
});

// Deletar aluguel por ID
router.delete("/:id", async (req, res) => {
  const idAluguel = Number(req.params.id);
  res.json(await deletarAluguel(idAluguel));
});

export default router;
