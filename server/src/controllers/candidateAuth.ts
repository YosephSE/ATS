import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Candidate from "../models/candidates";
import generateToken from "../utils/generateToken";
import asyncHandler from "express-async-handler";

const loginCandidate = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await Candidate.findOne({ email });

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      await generateToken(res, user);
      res
        .status(200)
        .json({
          _id: user._id,
          name: user.firstName,
          email: user.email,
          role: "user",
        });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const registerCandidate = asyncHandler(async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = await Candidate.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await Candidate.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  if (user) {
    await generateToken(res, user);
    res.status(201).json({
      _id: user._id,
      name: user.firstName,
      email: user.email,
      role: "user",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const logoutCandidate = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("auth", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: true,
    sameSite: "none",
  });
  res.status(200).json({ message: "User LoggedOut Successfully" });
});

export { registerCandidate, loginCandidate, logoutCandidate };
