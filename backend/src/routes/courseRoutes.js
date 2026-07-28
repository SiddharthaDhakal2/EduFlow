import { Router } from "express";
import { destroy, index, show, store, update } from "../controllers/courseController.js";
import { certificate, completeLesson, enroll, progress } from "../controllers/learningController.js";
import { optionalAuth, requireAdmin, requireAuth } from "../middleware/auth.js";
import { adminCourseUpload } from "../middleware/upload.js";

const router = Router();

router.get("/", index);
router.post(
  "/",
  requireAuth,
  requireAdmin,
  adminCourseUpload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "lessonVideos", maxCount: 50 },
  ]),
  store,
);
router.put(
  "/:slug",
  requireAuth,
  requireAdmin,
  adminCourseUpload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "lessonVideos", maxCount: 50 },
  ]),
  update,
);
router.get("/:slug", optionalAuth, show);
router.delete("/:slug", requireAuth, requireAdmin, destroy);
router.post("/:slug/enroll", requireAuth, enroll);
router.get("/:slug/progress", requireAuth, progress);
router.post("/:slug/progress", requireAuth, completeLesson);
router.get("/:slug/certificate", requireAuth, certificate);

export default router;
