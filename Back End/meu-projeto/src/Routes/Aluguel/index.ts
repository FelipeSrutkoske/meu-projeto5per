import express, { Router } from "express";
import {
  getTodosAlugueis,
  getAluguelPorId,
  gravaNovoAluguel,
  atualizaAluguel,
  deletarAluguel,
} from "../../Controllers/Aluguel";

const router: Router = express.Router();

router.get("/", async (req, res) => {
  res.json(await getTodosAlugueis());
});

router.get("/:id", async (req, res) => {
  const idAluguel = Number(req.params.id);
  res.json(await getAluguelPorId(idAluguel));
});

router.post("/novo", async (req, res) => {
  const corpo = req.body;
  res.json(await gravaNovoAluguel(corpo));
});

router.put("/atualizar", async (req, res) => {
  const corpo = req.body;
  res.json(await atualizaAluguel(corpo));
});

router.delete("/:id", async (req, res) => {
  const idAluguel = Number(req.params.id);
  res.json(await deletarAluguel(idAluguel));
});

export default router;
