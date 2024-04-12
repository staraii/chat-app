import express from "express";
import channelsController from "../controller/channelsController.js";
import jwtFilter from "../middleware/jwtFilter.js";

const router = express.Router();

router
	.get(
		"/",
		jwtFilter.authorize.bind({ role: "USER" }),
		channelsController.getAllChannels
	)
	.get(
		"/:id",
		jwtFilter.authorize.bind({ role: "USER" }),
		channelsController.getMessagesByChannelId
	).get("/:id/users", jwtFilter.authorize.bind({ role: "USER"}), channelsController.getUsersByChannelId)
	.post(
		"/:id",
		jwtFilter.authorize.bind({ role: "USER" }),
		channelsController.postMessageByChannelId
	)
	.put(
		"/",
		jwtFilter.authorize.bind({ role: "USER" }),
		channelsController.addChannel
	)
	.delete(
		"/:id",
		jwtFilter.authorize.bind({ role: "USER" }),
		channelsController.deleteChannel
	);

export default router;
