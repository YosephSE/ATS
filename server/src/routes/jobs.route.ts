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

router.post(
  "/",
  verifyToken,
  adminAuthorize(["admin", "super admin"]),
  createJob
);

router.get("/:id", verifyToken, singleJob);

router.put(
  "/:id",
  verifyToken,
  adminAuthorize(["admin", "super admin"]),
  updateJob
);

router.delete(
  "/:id",
  verifyToken,
  adminAuthorize(["admin", "super admin"]),
  deleteJob
);

export default router;
