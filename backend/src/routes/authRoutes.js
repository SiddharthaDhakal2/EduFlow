import { Router } from "express";
import { changePassword, login, logout, me, register, saveProfile } from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", requireAuth, logout);
router.get("/me", requireAuth, me);
router.put("/profile", requireAuth, saveProfile);
router.put("/password", requireAuth, changePassword);

export default router;
