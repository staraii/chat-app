import broadcastService from "../service/broadcastService.js";

const getAllBroadcasts = async (req, res) => {
	const messages = await broadcastService.getAllBroadcasts();
	if (messages.length == 0) {
		return res.status(204).send({ msg: "No messages" });
	}
	res.status(200).send(messages);
};

const postBroadcast = async (req, res) => {
	const message = req.body;
	if (message == undefined) {
		return res.status(400).send({ msg: "Missing message parameters" });
	}
	const result = await broadcastService.postBroadcast(message);
	res.status(201).json({ msg: "success" });
};
export default {
	getAllBroadcasts,
	postBroadcast,
};
