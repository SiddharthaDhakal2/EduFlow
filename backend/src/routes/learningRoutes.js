import { Router } from "express";
import { index } from "../controllers/learningController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, index);

export default router;
