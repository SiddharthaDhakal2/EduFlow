import { Router } from "express";
import { destroy, index, store, update } from "../controllers/announcementController.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", index);
router.post("/", requireAuth, requireAdmin, store);
router.put("/:id", requireAuth, requireAdmin, update);
router.delete("/:id", requireAuth, requireAdmin, destroy);

export default router;
