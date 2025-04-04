import express, { Router } from "express"; 
import { 
  atualizaCaminhao, 
  getAllCaminhoes, 
  getCaminhaoPorId, 
  gravaNovoCaminhao 
} from "../../Controllers/Caminhao";

const router: Router = express.Router(); 

// Rota para buscar todos os caminhões
router.get("/", async (req, res) => { 
  res.json(await getAllCaminhoes());
});

// Rota para buscar caminhão por ID
router.get("/:id", async (req, res) => { 
  const caminhaoId = Number(req.params.id);
  res.json(await getCaminhaoPorId(caminhaoId)); 
}); 

// Rota para cadastrar novo caminhão
router.post("/novo", async (req, res) => { 
  const caminhaoCorpo = req.body;
  res.json(await gravaNovoCaminhao(caminhaoCorpo)); 
});    

// Rota para atualizar caminhão existente
router.post("/atualizar", async (req, res) => { 
  const caminhaoCorpo = req.body;
  res.json(await atualizaCaminhao(caminhaoCorpo));
}); 

export default router;
