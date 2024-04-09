import express from "express";
import healthCheckController from "../controller/healthCheckController.js";

const router = express.Router();

router.get("/", healthCheckController.healthCheck);
router.get("/db", healthCheckController.dbHealthCheck);

export default router;
