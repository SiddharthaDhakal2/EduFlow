import { Router } from "express";
import { destroy, index, store, update } from "../controllers/categoryController.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", index);
router.post("/", requireAuth, requireAdmin, store);
router.put("/:name", requireAuth, requireAdmin, update);
router.delete("/:name", requireAuth, requireAdmin, destroy);

export default router;
