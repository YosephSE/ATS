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

router.get("/", verifyToken, allJobs);

router.post(
  "/",
  verifyToken,
  adminAuthorize(["super admin", "admin"]),
  createJob
);

router.get(
  "/:id",
  verifyToken,
 adminAuthorize(["super admin", "admin"]),
  singleJob
);

router.put(
  "/:id",
  verifyToken,
  adminAuthorize(["super admin", "admin"]),
  updateJob
);

router.delete(
  "/:id",
  verifyToken,
  adminAuthorize(["super admin", "admin"]),
  deleteJob
);

export default router;
