import express, { Router } from "express"; 
import {  atualizaCaminhao, getAllCaminhoes, getCaminhaoPorId, gravaNovoCaminhao, deletarCaminhao } from "../../Controllers/Caminhao";

const router: Router = express.Router(); 

router.get("/", async (req, res) => {
  try {
    const lista = await getAllCaminhoes();
    res.json(lista);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Falha ao buscar caminhões" });
  }
});

router.get("/:id", async (req, res) => { 
  const caminhaoId = Number(req.params.id);
  res.json(await getCaminhaoPorId(caminhaoId)); 
}); 

router.post("/novo", async (req, res) => { 
  const caminhaoCorpo = req.body;
  res.json(await gravaNovoCaminhao(caminhaoCorpo)); 
});    

router.put("/atualizar", async (req, res) => { 
  const caminhaoCorpo = req.body;
  res.json(await atualizaCaminhao(caminhaoCorpo));
}); 

router.delete("/:id", async (req, res) => {
  const caminhaoId = Number(req.params.id);
  res.json(await deletarCaminhao(caminhaoId));
});

export default router;
