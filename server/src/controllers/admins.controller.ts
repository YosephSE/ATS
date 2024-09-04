import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Admin from "../models/admins";
import generateToken from "../utils/generateToken";
import asyncHandler from "express-async-handler";
import generatePassword from "../utils/generatePassword";
import sendPasswordEmail from "../utils/mailSender";
import Application from "../models/applications";
import Job from "../models/jobs";
import Candidate from "../models/candidates";

const loginAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await Admin.findOne({ email });

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      await generateToken(res, user);
      res.status(200).json({
        _id: user._id,
        name: user.firstName,
        email: user.email,
        role: user.role,
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

const registerAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { firstName, lastName, email, phoneNumber, role } = req.body;
  const password = generatePassword();

  const userExists = await Admin.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await Admin.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    phoneNumber,
    role,
  });
  if (user) {
    await sendPasswordEmail(user.email, password);
    res.status(201).json({
      _id: user._id,
      name: user.firstName,
      email: user.email,
      role: user.role,
      message: "Admin Created Successfully",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const stats: any = asyncHandler(async (req: Request, res: Response) => {
  const totalApplicaitons = await Application.countDocuments();
  const totalJobs = await Job.countDocuments();
  const totalCandidates = await Candidate.countDocuments();
  const stat = {
    totalApplicaitons,
    totalJobs,
    totalCandidates,
  };
  res.status(200).json(stat);
  }
)

export { loginAdmin, registerAdmin, stats };
