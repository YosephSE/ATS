import { Router } from "express";
import {
  adminProfile,
  loginAdmin,
  registerAdmin,
  stats,
  updateProfile,
} from "../controllers/admins.controller";
import verifyToken from "../middleware/verifyToken";
import adminAuthorize from "../middleware/adminAuthorize";

const router = Router();

router.post("/login", loginAdmin);

router.get("/profile", adminProfile);

router.put("/profile", updateProfile);

router.post("/register", registerAdmin);

router.get("/stats", stats);

export default router;
