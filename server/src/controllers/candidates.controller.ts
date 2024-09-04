import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Candidate from "../models/candidates";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";

interface CustomRequest extends Request {
  user?: any;
}

const allCandidates = asyncHandler(async (req: Request, res: Response) => {
  const candidates = await Candidate.find();
  res.status(200).json(candidates);
});

const singleCandidate = asyncHandler(async (req: Request, res: Response) => {
  const candidate = await Candidate.findById(req.params.id);
  if (!candidate) {
    const error = new Error();
    (error as any).status = 404;
    throw error;
  }
  res.status(200).json(candidate);
});

const candidateProfile = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const candidate = await Candidate.findById(req.user._id).select(
      "-password"
    );
    if (!candidate) {
      const error = new Error();
      (error as any).status = 404;
      throw error;
    }
    res.status(200).json(candidate);
  }
);

const updateProfile = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const id = req.user._id;

    if (!req.body || Object.keys(req.body).length === 0) {
      const error = new Error("Request body is missing");
      (error as any).status = 400;
      throw error;
    }
    const updatedCandidate = await Candidate.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-password");
    if (!updatedCandidate) {
      const error = new Error();
      (error as any).status = 404;
      throw error;
    }
    res.status(200).json(updatedCandidate);
  }
);

const deleteProfile = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const id = req.user._id;

    const deletedCandidate = await Candidate.findByIdAndDelete(id);
    if (!deletedCandidate) {
      const error = new Error();
      (error as any).status = 404;
      throw error;
    }
    res.status(200).json({ message: "Candidate deleted successfully" });
  }
);

const loginCandidate = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await Candidate.findOne({ email });

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      await generateToken(res, user);
      res.status(200).json({
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

const myApplications = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const applications = await Candidate.find({ candidateId: req.user._id });
    res.status(200).json(applications);
  }
);
export {
  allCandidates,
  singleCandidate,
  candidateProfile,
  updateProfile,
  deleteProfile,
  registerCandidate,
  loginCandidate,
  logoutCandidate,
  myApplications,
};
