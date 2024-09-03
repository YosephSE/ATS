import { Router } from "express";
import { loginAdmin, registerAdmin } from "../controllers/adminAuth";
import verifyToken from "../middleware/verifyToken";
import adminAuthorize from "../middleware/adminAuthorize";

const router = Router();


router.post("/login", loginAdmin);

router.post("/register", verifyToken, adminAuthorize(["super admin"]),registerAdmin);

export default router;