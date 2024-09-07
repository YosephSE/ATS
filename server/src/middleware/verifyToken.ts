import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.SECRET_KEY;

interface CustomRequest extends Request {
  user?: any;
}
const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.auth;

  if (!token) {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret!);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default verifyToken;
