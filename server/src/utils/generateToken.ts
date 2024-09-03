import jwt from "jsonwebtoken";
import { Response } from "express";

const jwtSecret = process.env.SECRET_KEY || "aRbbSGDxnRX92nLW2KWaP0cvbqxJZuV3KMu3KXUiro9dlNq0uPypSelqk2lMT9PKYq7dXCtCJFQ4VXLhQGyyEWs3jdpSZFPVrdTg";

const generateToken = (res: Response, user: any) => {
  const payload = {
    id: user._id,
    role: user.role || "user",
  };

  const token = jwt.sign(payload, jwtSecret!, {
    expiresIn: "30d",
  });
  res.cookie("auth", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
