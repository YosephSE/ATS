import { Router } from "express";

import {
  createApplication,
  allApplications,
  singleApplication,
  updateApplication,
  
} from "../controllers/applications.controller";
import verifyToken from "../middleware/verifyToken";
import adminAuthorize from "../middleware/adminAuthorize";

const router = Router();

router.post("/", verifyToken, createApplication);
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
router.put("/:id", verifyToken, updateApplication);


export default router;
