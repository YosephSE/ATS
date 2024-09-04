import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Candidate from "../models/candidates";

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

const updateProfile = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const id = req.params.id;
    if (req.user._id !== id) {
      const error = new Error("Unauthorized");
      (error as any).status = 401;
      throw error;
    }
    if (!req.body || Object.keys(req.body).length === 0) {
      const error = new Error("Request body is missing");
      (error as any).status = 400;
      throw error;
    }
    const updatedCandidate = await Candidate.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCandidate) {
      const error = new Error();
      (error as any).status = 404;
      throw error;
    }
    res.status(200).json(updatedCandidate);
  }
);

const deleteProfile = asyncHandler(async (req: CustomRequest, res: Response) => {
  const id = req.params.id;
  if (req.user._id !== id) {
    const error = new Error("Unauthorized");
    (error as any).status = 401;
    throw error;
  }
  const deletedCandidate = await Candidate.findByIdAndDelete(id);
  if (!deletedCandidate) {
    const error = new Error();
    (error as any).status = 404;
    throw error;
  }
  res.status(200).json({ message: "Candidate deleted successfully" });
});

export { allCandidates, singleCandidate, updateProfile, deleteProfile };
