import { Router } from "express";

import {
  createApplication,
  allApplications,
  singleApplication,
  updateApplication,
  deleteApplication,
} from "../controllers/applications.controller";
import verifyToken from "../middleware/verifyToken";
import adminAuthorize from "../middleware/adminAuthorize";

const router = Router();

router.get(
  "/",
  verifyToken,
  adminAuthorize(["admin", "super admin"]),
  allApplications
);
router.get(
  "/:id",
  verifyToken,
  adminAuthorize(["admin", "super admin"]),
  singleApplication
);
router.post("/", verifyToken, createApplication);
router.put("/:id", verifyToken, updateApplication);
router.delete("/:id", verifyToken, deleteApplication);

export default router;
