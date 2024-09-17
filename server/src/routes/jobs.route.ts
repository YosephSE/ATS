import { Router } from "express";
import {
  allJobs,
  createJob,
  singleJob,
  updateJob,
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

router.get("/:id", singleJob);

router.put(
  "/:id",
  verifyToken,
  adminAuthorize(["admin", "super admin"]),
  updateJob
);


export default router;
