import { Request, Response } from "express";
import Job from "../models/jobs";
import asyncHandler from "express-async-handler";

const allJobs = asyncHandler(async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

const singleJob = asyncHandler(async (req: Request, res: Response) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    const error = new Error();
    (error as any).status = 404;
    throw error;
  }
  res.status(200).json(job);
});

const createJob = async (req: Request, res: Response) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json({ message: "Job created successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const updateJob = asyncHandler(async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
    res.status(201).json({ message: "Job updated successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

const deleteJob = asyncHandler(async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Job.findByIdAndDelete(id);
    res.status(201).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export { allJobs, singleJob, createJob, updateJob, deleteJob };
