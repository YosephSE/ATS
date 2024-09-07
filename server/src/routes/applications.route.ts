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

router.get("/", allApplications);
router.get("/:id", singleApplication);
router.post("/", createApplication);
router.put("/:id", updateApplication);
router.delete("/:id", deleteApplication);

export default router;
