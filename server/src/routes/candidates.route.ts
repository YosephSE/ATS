import {
  registerCandidate,
  loginCandidate,
  logoutCandidate,
  allCandidates,
  singleCandidate,
  updateProfile,
  deleteProfile,
  candidateProfile,
  myApplications,
  status,
  changePassword,
  createApplication,
} from "../controllers/candidates.controller";

import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import adminAuthorize from "../middleware/adminAuthorize";

const router = Router();

router.post("/register", registerCandidate);

router.post("/login", loginCandidate);

router.post("/logout", logoutCandidate);

router.get(
  "/",
  verifyToken,
  adminAuthorize(["admin", "super admin"]),
  allCandidates
);

router.get("/profile", verifyToken, candidateProfile);

router.get("/applications", verifyToken, myApplications);
router.post("/applications", verifyToken, createApplication);

router.get(
  "/:id",
  verifyToken,
  adminAuthorize(["admin", "super admin"]),
  singleCandidate
);

router.put("/profile", verifyToken, updateProfile);

router.delete("/profile", verifyToken, deleteProfile);

router.post("/status", status);

router.post("/changepassword", verifyToken, changePassword);

export default router;
