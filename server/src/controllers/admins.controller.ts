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
import mongoose from "mongoose";

interface CustomRequest extends Request {
  user?: any;
}

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

const adminProfile = asyncHandler(async (req: CustomRequest, res: Response) => {
  const admin = await Admin.findById(req.user._id).select("-password");
  if (!admin) {
    const error = new Error();
    (error as any).status = 404;
    throw error;
  }
  res.status(200).json(admin);
});

const updateProfile = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    // const id = req.user._id;
    const id = new mongoose.Types.ObjectId("66daeb6210c8a0a5a62474d6");
    if (!req.body || Object.keys(req.body).length === 0) {
      const error = new Error("Request body is missing");
      (error as any).status = 400;
      throw error;
    }
    const updatedAdmin = await Admin.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-password");

    if (!updatedAdmin) {
      const error = new Error();
      (error as any).status = 404;
      throw error;
    }
    res.status(200).json(updatedAdmin);
  }
);

const stats: any = asyncHandler(async (req: Request, res: Response) => {
  const totalApplications = await Application.countDocuments();
  const totalJobs = await Job.countDocuments();
  const totalCandidates = await Candidate.countDocuments();
  const pendingApplications = await Application.countDocuments({
    status: "pending",
  });
  const acceptedApplications = await Application.countDocuments({
    status: "accepted",
  });
  const rejectedApplications = await Application.countDocuments({
    status: "rejected",
  });
  const activeJobs = await Job.countDocuments({ status: "active" });
  const inactiveJobs = await Job.countDocuments({ status: "inactive" });

  const stat = {
    totalApplications,
    totalJobs,
    totalCandidates,
    pendingApplications,
    acceptedApplications,
    rejectedApplications,
    activeJobs,
    inactiveJobs,
  };
  res.status(200).json(stat);
});

export { loginAdmin, registerAdmin, stats, updateProfile, adminProfile };
