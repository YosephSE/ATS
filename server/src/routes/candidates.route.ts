import {
  allCandidates,
  singleCandidate,
  updateProfile,
  deleteProfile,
} from "../controllers/candidates.controller";

import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import adminAuthorize from "../middleware/adminAuthorize";
import { verify } from "crypto";

const router = Router();

router.get(
  "/",
  verifyToken,
  adminAuthorize(["super admin", "admin"]),
  allCandidates
);

router.get(
  "/:id",
  verifyToken,
  adminAuthorize(["super admin", "admin"]),
  singleCandidate
);

router.put(
  "/:id",
  verifyToken,
  updateProfile
);

router.delete("/:id",verifyToken, deleteProfile);
