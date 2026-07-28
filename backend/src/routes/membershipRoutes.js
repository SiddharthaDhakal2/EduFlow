import { Router } from "express";
import { initiateKhalti, show, verifyKhalti } from "../controllers/membershipController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, show);
router.post("/khalti/initiate", requireAuth, initiateKhalti);
router.post("/khalti/verify", requireAuth, verifyKhalti);

export default router;
