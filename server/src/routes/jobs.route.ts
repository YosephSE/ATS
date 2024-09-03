import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import adminAuthorize from "../middleware/adminAuthorize";
import {
  allJobs,
  createJob,
  singleJob,
  updateJob,
  deleteJob,
} from "../controllers/jobs.controller";

const router = Router();

router.get("/", verifyToken, allJobs);

router.post("/", verifyToken, createJob);

router.get("/:id", verifyToken, singleJob);

router.put("/:id", verifyToken, updateJob);

router.delete("/:id", verifyToken, deleteJob);

export default router;
