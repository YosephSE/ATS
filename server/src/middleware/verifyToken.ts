import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET || "aRbbSGDxnRX92nLW2KWaP0cvbqxJZuV3KMu3KXUiro9dlNq0uPypSelqk2lMT9PKYq7dXCtCJFQ4VXLhQGyyEWs3jdpSZFPVrdTg";

export interface CustomRequest extends Request {
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
