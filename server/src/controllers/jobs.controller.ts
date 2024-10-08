import { Request, Response } from "express";
import Job from "../models/jobs";
import asyncHandler from "express-async-handler";
import Application from "../models/applications";

interface CustomRequest extends Request {
  user?: any;
}
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
    minSalary,
    maxSalary,
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

  if (minSalary || maxSalary) {
    filter["minSalary"] = { $lte: maxSalary || 9000000000000 };
    filter["maxSalary"] = { $gte: minSalary || 0 };
  }


  const jobs = await Job.find(filter)
    .populate("postedBy", "firstName lastName email")
    .sort({ createdAt: -1 });

  const jobsWithApplicationCount = await Promise.all(
    jobs.map(async (job) => {
      const applicationCount = await Application.countDocuments({
        jobId: job._id,
      });

      return {
        ...job.toObject(),
        applications: applicationCount,
      };
    })
  );

  res.status(200).json(jobsWithApplicationCount);
});


const createJob = asyncHandler(async (req: CustomRequest, res: Response) => {
  const newJob = new Job(req.body);
  const postedBy = req.user._id;
  newJob.postedBy = postedBy;
  const job = await newJob.save();
  res.status(201).json(job);
});

const updateJob = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!req.body || Object.keys(req.body).length === 0) {
    const error = new Error("Request body is missing");
    (error as any).status = 400;
    throw error;
  }
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedJob) {
    const error = new Error();
    (error as any).status = 404;
    throw error;
  }
  res.status(201).json({ message: "Job updated successfully" });
});

const singleJob = asyncHandler(async (req: Request, res: Response) => {
  const job = await Job.findById(req.params.id).populate(
    "postedBy",
    "firstName lastName email"
  );
  if (!job) {
    const error = new Error();
    (error as any).status = 404;
    throw error;
  }
  res.status(200).json(job);
});



export { allJobs, singleJob, createJob, updateJob };
