import channelsService from "../service/channelsService.js";

const getAllChannels = async (req, res) => {
	const channels = await channelsService.getAllChannels();
	if (channels.length == 0) {
		return res.status(204).send({ msg: "No channels" });
	}
	res.status(200).send(channels);
};

const getMessagesByChannelId = async (req, res) => {
	const channelName = req.params.id;
	if (channelName == undefined) {
		return res.status(400).json({ error: "Missing parameters" });
	}
	const messages = await channelsService.getMessagesByChannelId(channelName);
	res.status(200).json({ channelName, messages });
};

const postMessageByChannelId = async (req, res) => {
	const channelName = req.params.id;
	const {username, message} = req.body;
	if (channelName == undefined) {
		return res.status(400).json({ error: "Missing parameters" });
	}
	await channelsService.postMessageByChannelId({ channelName, username, message });
	res.status(200).json({msg: "Message posted"});
};

const addChannel = async (req, res) => {
	const { channelName, username } = req.body;
	if (channelName == undefined || username == undefined) {
		return res.status(400).json({ error: "Missing parameters" });
	}
	await channelsService.addChannel(channelName, username);
	res.status(201).json({ msg: "Channel created" });
};
const deleteChannel = async (req, res) => {
	const channelName = req.params.id;
	if (channelName == undefined) {
		return res.status(400).json({ error: "Missing parameters" });
	}
	const result = await channelsService.deleteChannel(channelName);
	if (!result) {
		return res.status(400).json({ error: "Bad request" });
	}
	res.status(200).json({ msg: "Channel deleted" });
};

export default {
	getAllChannels,
	getMessagesByChannelId,
	postMessageByChannelId,
	addChannel,
	deleteChannel,
};