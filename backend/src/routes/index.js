import { Router } from "express";
import chatRoutes from "./chat.routes.js";
import feedbackRoutes from "./feedback.routes.js";
import userRoutes from "./user.routes.js";

const router = Router();

router.get("/health", (req, res) => res.json({ ok: true, status: "healthy" }));
router.use("/api/chat", chatRoutes);
router.use("/api/feedback", feedbackRoutes);
router.use("/api/users", userRoutes);

export default router;
