import { Router } from "express";
import { loginAdmin, registerAdmin, stats } from "../controllers/admins.controller";
import verifyToken from "../middleware/verifyToken";
import adminAuthorize from "../middleware/adminAuthorize";

const router = Router();

router.post("/login", loginAdmin);

router.post(
  "/register",
  verifyToken,
  adminAuthorize(["super admin"]),
  registerAdmin
);

router.get("/stats", verifyToken, adminAuthorize(["super admin", "admin"]), stats);

export default router;
