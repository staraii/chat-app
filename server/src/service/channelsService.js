import { fetchCollection } from "../mongodb/mongoDbClient.js";
//import { ObjectId } from "mongodb";
import dateTimeUtil from "../utils/dateTimeUtil.js";

const CHANNEL_COLLECTION_NAME = "channels";

//const query = { channelName: "broadcast" };
const getAllChannels = async () => {
	const filter = { channelName: { $ne: "broadcast" } };
	const cursor = fetchCollection(CHANNEL_COLLECTION_NAME).find(filter);
	const result = await cursor.toArray();
	if (result.length < 1) {
		return false;
	}
	return result;
};
const getMessagesByChannelId = async (channelName) => {
	const query = { channelName };
	const projection = { messages: 1 };
	const cursor = await fetchCollection(CHANNEL_COLLECTION_NAME).find(query, {
		projection,
	});
	const result = await cursor.toArray();
	if (result.length < 1) {
		return false;
	}
	return result;
};
const postMessageByChannelId = async ({ channelName, username, message }) => {
	const query = { channelName: channelName };
	const { date, time, now } = dateTimeUtil();
	const newMessage = { date, time, now, username, message };
	const result = await fetchCollection(
		CHANNEL_COLLECTION_NAME
	).findOneAndUpdate(query, { $push: { messages: newMessage } });
	if (result.modifiedCount < 1) {
		throw new Error("Failet to post message");
	}
	return result;
};

const addChannel = async (channelName, username) => {
	console.log(channelName)
	const { date, time, now } = dateTimeUtil();
	const welcomeMessage = `Welcome to ${channelName}, this channel was created at ${now}`;
	const newChannel = {
		channelName: channelName,
		ownedBy: username,
		messages: [{ date, time, now, message: welcomeMessage }],
	};
	const result = await fetchCollection(CHANNEL_COLLECTION_NAME).insertOne(newChannel);
	if (result.insertedCount == 0) {
		throw new Error("Failed to create new channel");
	}
	return result;
};

const deleteChannel = async (channelName) => {
	const result = await fetchCollection(CHANNEL_COLLECTION_NAME).deleteOne({ channelName: channelName });
	if (result.deletedCount == 0) {
		return false;
	}
	return result;
}

export default {
	getAllChannels,
	getMessagesByChannelId,
	postMessageByChannelId,
	addChannel,
	deleteChannel,
};
