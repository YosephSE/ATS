import jwt from "jsonwebtoken";
import { Response } from "express";
import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.SECRET_KEY;
const env = process.env.ENV;
console.log(jwtSecret);
console.log(env === "production");

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
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
