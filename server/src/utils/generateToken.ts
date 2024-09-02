import jwt from "jsonwebtoken";
import { Response } from "express";

const jwtSecret = process.env.JWT_SECRET;

const generateToken = (res: Response, user: any) => {
  const payload = {
    id: user.id,
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
