import { Router } from "express";
import {
  allJobs,
  createJob,
  singleJob,
  updateJob,
  deleteJob,
} from "../controllers/jobs.controller";
import verifyToken from "../middleware/verifyToken";
import adminAuthorize from "../middleware/adminAuthorize";
const router = Router();

router.get("/", allJobs);

router.post("/", createJob);

router.get("/:id", singleJob);

router.put("/:id", updateJob);

router.delete("/:id", deleteJob);

export default router;
