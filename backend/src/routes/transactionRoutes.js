import { Router } from "express";
import { transactions } from "../controllers/adminController.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, requireAdmin, transactions);

export default router;
