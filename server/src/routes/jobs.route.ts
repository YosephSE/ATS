import { Router } from "express";
import { allJobs, createJob } from "../controllers/jobs.controller";

const router = Router();

router.get("/", allJobs);

router.post("/", createJob);

export default router;
