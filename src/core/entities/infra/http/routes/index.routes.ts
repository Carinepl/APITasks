import { Router } from "express";
import { router as taskRoutes } from "./tasks.routes";

const router = Router();

router.use("/v1/tasks", taskRoutes);

export { router };