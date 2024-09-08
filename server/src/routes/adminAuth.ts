import { Router } from "express";
import {
  adiminsToApprove,
  adminProfile,
  approveAdmin,
  loginAdmin,
  registerAdmin,
  stats,
  updateProfile,
} from "../controllers/admins.controller";
import verifyToken from "../middleware/verifyToken";
import adminAuthorize from "../middleware/adminAuthorize";

const router = Router();

router.post("/login", loginAdmin);

router.get(
  "/profile",
  verifyToken,
  adminAuthorize(["admin", "super admin"]),
  adminProfile
);

router.put(
  "/profile",
  verifyToken,
  adminAuthorize(["admin", "super admin"]),
  updateProfile
);

router.post("/register", registerAdmin);

router.get(
  "/stats",
  verifyToken,
  adminAuthorize(["admin", "super admin"]),
  stats
);

router.post("/approve/:id", approveAdmin);

router.get("/adminsToApprove", adiminsToApprove);

export default router;
