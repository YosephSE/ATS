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
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtsecret = process.env.SECRET_KEY;

interface CustomRequest extends Request {
  user?: any;
}

const loginAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await Admin.findOne({ email });

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password!);
    const approved = user.approved;

    if (isMatch && approved) {
      if(user.firstTime){
        await Admin.findOneAndUpdate({ email }, {
          firstTime: false
        })
      }
      const token: any = generateToken(res, user);
      res.status(200).json({
        _id: user._id,
        name: user.firstName,
        email: user.email,
        role: user.role,
        firstTime: user.firstTime,
        token,
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
  const { firstName, lastName, email, phoneNumber } = req.body;

  const userExists = await Admin.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await Admin.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    password: "",
    role: "admin",
    approved: false,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.firstName,
      email: user.email,
      role: user.role,
      message: "Request sent to super admin for approval",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const adminsToApprove = asyncHandler(async (req: Request, res: Response) => {
  const admins = await Admin.find({ approved: false }).select("-password");
  res.status(200).json(admins);
});

const approveAdmin = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const admin = await Admin.findById(id);
  if (!admin) {
    const error = new Error();
    (error as any).status = 404;
    throw error;
  }
  const password = generatePassword();
  sendPasswordEmail(admin?.email, password);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  await Admin.findByIdAndUpdate(id, {
    password: hashedPassword,
    approved: true,
  });
  res.status(200).json({ message: "Admin approved successfully" });
});

const adminProfile = asyncHandler(async (req: CustomRequest, res: Response) => {
  const id = req.user._id;
  // const id = new mongoose.Types.ObjectId("66daeb6210c8a0a5a62474d6");
  const admin = await Admin.findById(id).select("-password");
  if (!admin) {
    const error = new Error();
    (error as any).status = 404;
    throw error;
  }
  res.status(200).json(admin);
});

const updateProfile = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const id = req.user._id;
    // const id = new mongoose.Types.ObjectId("66daeb6210c8a0a5a62474d6");
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

const status: any = asyncHandler(async (req: Request, res: Response) => {
  const token = req.body.token;

  if (!token) {
    res.json({ loggedIn: false });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtsecret!) as jwt.JwtPayload;
    const admin = await Admin.findById(decoded._id);

    res.json({
      id: admin?._id,
      role: admin?.role,
      name: admin?.firstName,
      email: admin?.email,
      firstTime: admin?.firstTime
    });
  } catch (error) {
    res.json({ loggedIn: false, message: jwtsecret! });
  }
});

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
const changePassword = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const id = req.user._id;
    const { oldPassword, newPassword } = req.body;

    const admin = await Admin.findById(id);

    if (!admin) {
      res.status(404).json({ message: "Admin not found" });
      return;
    }

    const isMatch = admin.password
      ? await bcrypt.compare(oldPassword, admin.password)
      : false;

    if (!isMatch) {
      res.status(401).json({ message: "Invalid old password" });
      return;
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    admin.password = hashedNewPassword;
    await admin.save();

    res.status(200).json({ message: "Password changed successfully" });
  }
);

export {
  loginAdmin,
  registerAdmin,
  stats,
  updateProfile,
  adminProfile,
  approveAdmin,
  adminsToApprove,
  status,
  changePassword,
};
