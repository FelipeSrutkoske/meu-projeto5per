import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const autenticarToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({ erro: "Token não fornecido" });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err || !decoded || typeof decoded !== "object") {
      res.status(403).json({ erro: "Token inválido" });
      return;
    }

    const payload = decoded as { id: number; email: string };

    req.usuario = {
      id: payload.id,
      email: payload.email,
    };

    console.log("Usuário autenticado:", req.usuario); // ✅ deve aparecer agora!

    next();
  });
};




