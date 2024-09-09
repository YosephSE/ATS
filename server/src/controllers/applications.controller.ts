import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Application from "../models/applications";
import Job from "../models/jobs";
import Candidate from "../models/candidates";
import applicationScore from "../utils/applicationScore";

interface CustomRequest extends Request {
  user?: any;
}

const allApplications = asyncHandler(async (req: Request, res: Response) => {
  const applications = await Application.find()
    .populate({
      path: "jobId",
    })
    .populate({ path: "candidateId", select: "firstName lastName email" });
  res.status(200).json(applications);
});

const singleApplication = asyncHandler(async (req: Request, res: Response) => {
  const application = await Application.findById(req.params.id)
    .populate({ path: "jobId" })
    .populate({ path: "candidateId" });
  if (!application) {
    const error = new Error();
    (error as any).status = 404;
    throw error;
  }
  res.status(200).json(application);
});

const createApplication = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { jobId } = await req.body;
    const candidateId = await req.user._id;
    const status = "pending";

    const jobDetails = await Job.findById(jobId);
    const candidateDetails = await Candidate.findById(candidateId);
    if (!candidateDetails?.skills) {
      res
        .status(400)
        .json({ message: "Please add your skills to your profile!" });
      return;
    } else if (!candidateDetails?.education) {
      res
        .status(400)
        .json({ message: "Please add your education to your profile!" });
      return;
    } else if (!candidateDetails?.experience) {
      res
        .status(400)
        .json({ message: "Please add your experience to your profile!" });
      return;
    }

    const toBeScored = {
      job: jobDetails,
      candidate: candidateDetails,
    };
    console.log(toBeScored);
    const score = await applicationScore(toBeScored);

    const newApplication = {
      jobId,
      candidateId,
      status,
      AIScore: score,
    };
    const applicationExists = await Application.findOne({
      jobId,
      candidateId: req.user._id,
    });
    if (applicationExists) {
      const error = new Error("Application already exists");
      (error as any).status = 400;
      throw error;
    }
    const application = new Application(newApplication);
    await application.save();
    res.status(201).json({ message: "Application created successfully" });
  }
);

const updateApplication = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const id = req.params.id;
    if (!req.body || Object.keys(req.body).length === 0) {
      const error = new Error("Request body is missing");
      (error as any).status = 400;
      throw error;
    }
    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedApplication) {
      const error = new Error();
      (error as any).status = 404;
      throw error;
    } 
    res.status(200).json(updatedApplication);
  }
);

const deleteApplication = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      const error = new Error();
      (error as any).status = 404;
      throw error;
    } else if (application.candidateId !== req.user._id) {
      const error = new Error(
        "You do not have permission to delete this application"
      );
      (error as any).status = 403;
      res.status(200).json({ message: "Application deleted successfully" });
    }
  }
);

export {
  allApplications,
  singleApplication,
  createApplication,
  updateApplication,
  deleteApplication,
};
