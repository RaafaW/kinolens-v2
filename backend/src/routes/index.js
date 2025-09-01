import { Router } from "express";
import chatRoutes from "./chat.routes.js";

const router = Router();

router.get("/health", (req, res) => res.json({ ok: true, status: "healthy" }));
router.use("/api/chat", chatRoutes);

export default router;
