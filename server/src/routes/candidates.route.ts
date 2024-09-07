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
} from "../controllers/candidates.controller";

import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import adminAuthorize from "../middleware/adminAuthorize";

const router = Router();

router.post("/register", registerCandidate);

router.post("/login", loginCandidate);

router.post("/logout", logoutCandidate);

router.get("/", allCandidates);

router.get("/profile", candidateProfile);

router.get("/applications", myApplications);

router.get("/:id", singleCandidate);

router.put("/profile", updateProfile);

router.delete("/profile", deleteProfile);

export default router;
