import express, { Router } from "express"; 
import { atualizaUsuario, getAllUsuarios, getUsuarioPorId, gravaNovoUsuario } from "../../Controllers/Usuario"

const router: Router = express.Router(); 

router.get("/", async(req, res) => { 
    res.json(await getAllUsuarios()); 
});

router.get("/:id", async (req, res) => { 
    const id = Number(req.params.id);
    res.json(await getUsuarioPorId(id)) 
}); 

router.post('/novoUsuario', async (req, res) => { 
    const usuarioCorpo = req.body 
    res.json(await gravaNovoUsuario(usuarioCorpo)) 
});    

router.post('/atualizaUsuario', async (req, res) => { 
    const usuarioCorpo = req.body 
    res.json(await atualizaUsuario(usuarioCorpo))
}) 

export default router;