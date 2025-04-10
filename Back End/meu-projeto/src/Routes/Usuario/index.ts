import express, { Router, Request, Response } from "express";
import {
  atualizaUsuario,
  getAllUsuarios,
  getUsuarioPorId,
  gravaNovoUsuario,
  removerUsuario,
  loginUsuario,
  getUsuariosPaginados
} from "../../Controllers/Usuario";
import { autenticarToken } from "../../middlewares/autenticacao";

const router: Router = express.Router();

router.get("/", async (req, res) => {
  try {
    const usuarios = await getAllUsuarios();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar usuários" });
  }
});

router.get("/paginado", async (req, res) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = parseInt(req.query.offset as string) || 0;

  try {
    const usuarios = await getUsuariosPaginados(limit, offset);
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar usuários com paginação" });
  }
});

router.get("/perfil", autenticarToken, async (req, res) => {
  try {
    const id = (req as any).usuario.id;
    const usuario = await getUsuarioPorId(id); 

    if (!usuario) {
      res.status(404).json({ erro: "Usuário não encontrado" });
      return;
    }

    res.json(usuario);
  } catch (error) {
    console.error("Erro ao buscar perfil do usuário:", error);
    res.status(500).json({ erro: "Erro ao buscar perfil do usuário" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const usuario = await getUsuarioPorId(id);

    if (!usuario) {
      res.status(404).json({ erro: "Usuário não encontrado" });
      return;
    }

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar usuário" });
  }
});

router.post("/novoUsuario", async (req, res) => {
  try {
    const usuarioCorpo = req.body;
    const resultado = await gravaNovoUsuario(usuarioCorpo);

    if (typeof resultado === "string" && resultado.includes("inválido")) {
      res.status(400).json({ erro: resultado });
      return;
    }

    res.status(201).json({ mensagem: resultado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao cadastrar usuário" });
  }
});

router.put("/atualizaUsuario", autenticarToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarioId = req.usuario?.id;

    if (!usuarioId) {
      res.status(401).json({ erro: "Usuário não autenticado" });
      return;
    }

    const usuarioCorpo = req.body;
    usuarioCorpo.idusuario = usuarioId;

    const resultado = await atualizaUsuario(usuarioCorpo);
    res.json({ mensagem: resultado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao atualizar usuário" });
  }
});

router.put("/atualizaUsuarioSemLogin", async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarioId = req.body.idusuario;

    if (!usuarioId) {
      res.status(400).json({ erro: "ID do usuário não fornecido" });
      return;
    }

    const usuarioCorpo = req.body;
    usuarioCorpo.idusuario = usuarioId;

    const resultado = await atualizaUsuario(usuarioCorpo);
    res.json({ mensagem: resultado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao atualizar usuário" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const resultado = await removerUsuario(id);
    res.json({ mensagem: resultado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao remover usuário" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    const resultado = await loginUsuario(email, senha);

    if (typeof resultado === "string") {
      res.status(400).json({ erro: resultado });
    } else {
      res.json(resultado); 
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao realizar login" });
  }
});

export default router;
