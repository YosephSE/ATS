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

router.post("/", verifyToken, adminAuthorize, createJob);

router.get("/:id", adminAuthorize, verifyToken, singleJob);

router.put("/:id", verifyToken, adminAuthorize, updateJob);

router.delete("/:id", verifyToken, adminAuthorize, deleteJob);

export default router;
