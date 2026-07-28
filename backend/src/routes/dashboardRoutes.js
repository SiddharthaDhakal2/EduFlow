import { Router } from "express";
import { adminDashboard, userDashboard } from "../controllers/dashboardController.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/user/dashboard", requireAuth, userDashboard);
router.get("/admin/dashboard", requireAuth, requireAdmin, adminDashboard);

export default router;
