import express from "express";
import broadcastController from "../controller/broadcastController.js";

const router = express.Router();

router
	.get("/", broadcastController.getAllBroadcasts)
	.post("/", broadcastController.postBroadcast);

export default router;
