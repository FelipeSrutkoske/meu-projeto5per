import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const autenticarToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  console.log("🟡 Token recebido:", token);

  if (!token) {
    console.warn("⛔ Token não fornecido");
    res.status(401).json({ erro: "Token não fornecido" });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      console.error("❌ Erro na verificação do token:", err); 
    }

    if (!decoded || typeof decoded !== "object") {
      console.warn("⚠️ Token inválido ou malformado:", decoded); 
      res.status(403).json({ erro: "Token inválido" });
      return;
    }

    const payload = decoded as { id: number; email: string };

    (req as any).usuario = {
      id: payload.id,
      email: payload.email,
    };

    console.log("✅ Usuário autenticado:", (req as any).usuario);

    next();
  });
};





