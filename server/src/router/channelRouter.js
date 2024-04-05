import express from "express";
import channelController from "../controller/channelController.js";

const router = express.Router();

router
	.get("/", channelController.getAllChannels)
	.get("/:id", channelController.getMessagesByChannelId)
	.post("/:id", channelController.postMessageByChannelId)
	.put("/", channelController.addChannel)
	.delete("/:id", channelController.deleteChannel);

export default router;
