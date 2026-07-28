import { Router } from "express";
import { adminMedia, profileImage } from "../controllers/uploadController.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import { adminMediaUpload, userProfileUpload } from "../middleware/upload.js";

const router = Router();

router.post("/profile", requireAuth, userProfileUpload.single("image"), profileImage);
router.post("/admin", requireAuth, requireAdmin, adminMediaUpload.single("file"), adminMedia);

export default router;
