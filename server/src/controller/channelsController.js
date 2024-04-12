import channelsService from "../service/channelsService.js";

const getAllChannels = async (req, res) => {
	const channels = await channelsService.getAllChannels();
	if (channels.length == 0) {
		return res.status(204).send({ msg: "No channels" });
	}
	res.status(200).send(channels);
};

const getMessagesByChannelId = async (req, res) => {
	const channelId = req.params.id;
	if (channelId == undefined) {
		return res.status(400).json({ error: "Missing parameters" });
	}
	const messages = await channelsService.getMessagesByChannelId(channelId);
	res.status(200).json(messages);
};

const getUsersByChannelId = async (req, res) => {
	const channelId = req.params.id;
	if (channelId == undefined) {
		return res.status(400).json({ error: "Missing channel id" });
	}
	const users = await channelsService.getUsersByChannelId(channelId);
	res.status(200).json(users);
}

const postMessageByChannelId = async (req, res) => {
	const channelId = req.params.id;
	const { username, message, timeStamp } = req.body;
	console.log(username)
	if (channelId == undefined) {
		return res.status(400).json({ error: "Missing parameters" });
	}
	await channelsService.postMessageByChannelId({ channelId, username, message, timeStamp });
	res.status(200).json({msg: "Message posted"});
};

const addChannel = async (req, res) => {
	const { channelName, ownedBy } = req.body;
	console.log(channelName, ownedBy)
	if (channelName == undefined || ownedBy == undefined) {
		return res.status(400).json({ error: "Missing parameters" });
	}
	await channelsService.addChannel({channelName, ownedBy});
	res.status(201).json({ msg: "Channel created" });
};
const deleteChannel = async (req, res) => {
	const channelId = req.params.id;
	if (channelId == undefined) {
		return res.status(400).json({ error: "Missing parameters" });
	}
	const result = await channelsService.deleteChannel(channelId);
	if (!result) {
		return res.status(400).json({ error: "Bad request" });
	}
	res.status(200).json({ msg: "Channel deleted" });
};

export default {
	getAllChannels,
	getMessagesByChannelId,
	getUsersByChannelId,
	postMessageByChannelId,
	addChannel,
	deleteChannel,
};
