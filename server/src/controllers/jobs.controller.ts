import { Request, Response } from "express";
import Job from "../models/jobs";
import asyncHandler from "express-async-handler";

const allJobs = asyncHandler(async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

const singleJob = async (req: Request, res: Response) => {
  try {
    const job = await Job.findById(req.params.id);
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const createJob = async (req: Request, res: Response) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.json(newJob);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};


export { allJobs, singleJob, createJob };
