import express, { Router } from "express"; 
import {  atualizaCaminhao, getAllCaminhoes, getCaminhaoPorId, gravaNovoCaminhao, deletarCaminhao } from "../../Controllers/Caminhao";

const router: Router = express.Router(); 

// Buscar todos os caminhões
router.get("/", async (req, res) => { 
  res.json(await getAllCaminhoes());
});

// Buscar caminhão por ID
router.get("/:id", async (req, res) => { 
  const caminhaoId = Number(req.params.id);
  res.json(await getCaminhaoPorId(caminhaoId)); 
}); 

// Cadastrar novo caminhão
router.post("/novo", async (req, res) => { 
  const caminhaoCorpo = req.body;
  res.json(await gravaNovoCaminhao(caminhaoCorpo)); 
});    

// Atualizar caminhão existente
router.put("/atualizar", async (req, res) => { 
  const caminhaoCorpo = req.body;
  res.json(await atualizaCaminhao(caminhaoCorpo));
}); 

// Deletar caminhão por ID
router.delete("/:id", async (req, res) => {
  const caminhaoId = Number(req.params.id);
  res.json(await deletarCaminhao(caminhaoId));
});

export default router;
