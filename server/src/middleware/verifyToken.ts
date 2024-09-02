import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET;

export interface CustomRequest extends Request {
  user?: any;
}
const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.auth;

  if (!token) {
    return res.status(403).send("Access denied");
  }
  try {
    const decoded = jwt.verify(token, jwtSecret!);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send("Invalid token");
  }
};

export default verifyToken;
