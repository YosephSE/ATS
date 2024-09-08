import jwt from "jsonwebtoken";
import { Response } from "express";
import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.SECRET_KEY;
const env = process.env.ENV;

const generateToken = (res: Response, user: any) => {
  const payload = {
    _id: user._id,
    role: user.role || "user",
  };

  const token = jwt.sign(payload, jwtSecret!, {
    expiresIn: "30d",
  });
  res.cookie("auth", token, {
    httpOnly: true,
    secure: env === "production",
    sameSite: env === "production"? "none": "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return token;
};

export default generateToken;
