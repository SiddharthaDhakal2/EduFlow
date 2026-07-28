import { Router } from "express";
import { transactions, users } from "../controllers/adminController.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/users", requireAuth, requireAdmin, users);
router.get("/transactions", requireAuth, requireAdmin, transactions);

export default router;
