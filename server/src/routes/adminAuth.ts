import { Router } from "express";
import {
  adminsToApprove,
  adminProfile,
  approveAdmin,
  loginAdmin,
  registerAdmin,
  stats,
  status,
  updateProfile,
  changePassword,
  adminJobs,
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

router.get("/stats", stats);

router.get(
  "/jobs",
  verifyToken,
  adminAuthorize(["admin", "super admin"]),
  adminJobs
);
router.post("/approve/:id", approveAdmin);

router.get("/adminsToApprove", adminsToApprove);

router.post("/status", status);

router.post("/changepassword", verifyToken, changePassword);

export default router;
