import { Router } from "express";
import { featured } from "../controllers/courseController.js";
import adminRoutes from "./adminRoutes.js";
import announcementRoutes from "./announcementRoutes.js";
import authRoutes from "./authRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import courseRoutes from "./courseRoutes.js";
import dashboardRoutes from "./dashboardRoutes.js";
import learningRoutes from "./learningRoutes.js";
import membershipRoutes from "./membershipRoutes.js";
import transactionRoutes from "./transactionRoutes.js";
import uploadRoutes from "./uploadRoutes.js";

const router = Router();

router.get("/server", (req, res) => res.json({ status: 200, server: "eduflow-api" }));
router.get("/api/featured-courses", featured);
router.use("/api/auth", authRoutes);
router.use("/api/categories", categoryRoutes);
router.use("/api/courses", courseRoutes);
router.use("/api/announcements", announcementRoutes);
router.use("/api/membership", membershipRoutes);
router.use("/api/uploads", uploadRoutes);
router.use("/api/learning", learningRoutes);
router.use("/api", dashboardRoutes);
router.use("/api/admin", adminRoutes);
router.use("/api/transactions", transactionRoutes);

export default router;
