import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  name: string;
  email: string;
  password:string;
}


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "Token não fornecido" });

  const token = authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) return res.status(401).json({ message: "Token inválido" });

  try {
    const payload = jwt.verify(token, process.env.JWT_KEY!) as JwtPayload;
    
    (req as any).user = payload;
    next();
    
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
};