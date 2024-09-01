import { Request, Response } from "express";
import Job from "../models/jobs";
import asyncHandler from "express-async-handler";

const allJobs = asyncHandler(async (req: Request, res: Response) => {
  const {
    title,
    location,
    department,
    type,
    status,
    postedBy,
    createdAt,
    description,
  } = req.query;

  const filter: any = {};

  if (title) filter.title = title;
  if (location) filter.location = location;
  if (department) filter.department = department;
  if (type) filter.type = type;
  if (status) filter.status = status;
  if (postedBy) filter.postedBy = postedBy;
  if (createdAt) filter.createdAt = createdAt;
  if (description) {
    filter.description = { $regex: description, $options: "i" };
  }

  const jobs = await Job.find(filter);

  res.status(200).json(jobs);
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

const createJob = asyncHandler(async (req: Request, res: Response) => {
  const newJob = new Job(req.body);
  await newJob.save();
  res.status(201).json({ message: "Job created successfully" });
});

const updateJob = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!req.body || Object.keys(req.body).length === 0) {
    const error = new Error("Request body is missing");
    (error as any).status = 400;
    throw error;
  }
  await Job.findByIdAndUpdate(id, req.body, { new: true });
  res.status(201).json({ message: "Job updated successfully" });
});

const deleteJob = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const deletedJob = await Job.findByIdAndDelete(id);
  if (!deletedJob) {
    const error = new Error();
    (error as any).status = 404;
    throw error;
  }
  res.status(201).json({ message: "Job deleted successfully" });
});

export { allJobs, singleJob, createJob, updateJob, deleteJob };
