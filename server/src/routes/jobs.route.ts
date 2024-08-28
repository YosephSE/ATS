import { Router, Response, Request } from "express";
import { allJobs, createJob } from "../controllers/jobs.controller";
import Job from "../models/jobs";

const router = Router();

router.get("/", allJobs);

router.post("/", createJob);

export default router;
