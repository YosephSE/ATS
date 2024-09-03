import jwt from "jsonwebtoken";
import { Response } from "express";
const generateToken = (res: Response, userId: any) => {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY!, {
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
