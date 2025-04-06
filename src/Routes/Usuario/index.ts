import express, { Router } from "express"; 
import { atualizaUsuario, getAllUsuarios, getUsuarioPorId, gravaNovoUsuario, removerUsuario, loginUsuario, getUsuariosPaginados } from "../../Controllers/Usuario";

const router: Router = express.Router(); 


// Consultar todos usuários
router.get("/", async(req, res) => { 
    res.json(await getAllUsuarios()); 
});

router.get("/paginado", async (req, res) => {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
  
    try {
      const usuarios = await getUsuariosPaginados(limit, offset);
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar usuários com paginação" });
    }
  });


// Consultar usuário por ID
router.get("/:id", async (req, res) => { 
    const id = Number(req.params.id);
    res.json(await getUsuarioPorId(id)) 
}); 


// Criar novo usuário
router.post('/novoUsuario', async (req, res) => { 
    const usuarioCorpo = req.body 
    res.json(await gravaNovoUsuario(usuarioCorpo)) 
});    


// Atualizar usuário por ID
router.put('/atualizaUsuario', async (req, res) => { 
    const usuarioCorpo = req.body 
    res.json(await atualizaUsuario(usuarioCorpo))
}) 

// Remover usuário por ID
router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);
    res.json(await removerUsuario(id));
  });
  
  // Login de usuário
  router.post("/login", async (req, res) => {
    const { email, senha } = req.body;
    const resultado = await loginUsuario(email, senha);
    res.json(resultado);
  });

export default router;