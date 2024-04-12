import { fetchCollection } from "../mongodb/mongoDbClient.js";
import { ObjectId } from "mongodb";
//import dateTimeUtil from "../utils/dateTimeUtil.js";

const CHANNELS_COLLECTION_NAME = "channels";
const USERS_COLLECTION_NAME = "users";
const MESSAGES_COLLECTION_NAME = "messages";


const getAllChannels = async () => {
	const cursor = fetchCollection(CHANNELS_COLLECTION_NAME).find({});
	const result = await cursor.toArray();
	if (result.length < 1) {
		return false;
	}
	return result;
};
const getMessagesByChannelId = async (channelId) => {
	const query = { channelId: new ObjectId(channelId) };
	const cursor = await fetchCollection(MESSAGES_COLLECTION_NAME).find(query);
	const result = await cursor.toArray();
	if (result.length === 0) {
		return false;
	}
	return result;
};

const getUsersByChannelId = async (channelId) => {
	const query = { _id: new ObjectId(channelId) };
	const projection = { usersOnline: 1 };
	const cursor = await fetchCollection(CHANNELS_COLLECTION_NAME).find(query, { projection })
	const result = await cursor.toArray();
	if (result.length < 1) {
		return false;
	}
	return result;
};
const postMessageByChannelId = async ({ channelId, username, message }) => {
	const query = { channelName: channelName };
	//const { date, time, now } = dateTimeUtil();
	const newMessage = { date, time, now, username, message };
	const result = await fetchCollection(
		MESSAGES_COLLECTION_NAME
	).findOneAndUpdate(query, { $push: { messages: newMessage } });
	if (result.modifiedCount < 1) {
		throw new Error("Failet to post message");
	}
	return result;
};

const addChannel = async ({channelName, username}) => {
	const newChannel = {
		channelName: channelName,
		ownedBy: username,
		usersOnline: []
	};
	const result = await fetchCollection(CHANNELS_COLLECTION_NAME).insertOne(
		newChannel
	);
	if (result.insertedCount == 0) {
		throw new Error("Failed to create new channel");
	}
	return result;
};

const deleteChannel = async (channelId) => {
	const result = await fetchCollection(CHANNELS_COLLECTION_NAME).deleteOne({
		_id: new ObjectId(channelId),
	});
	if (result.deletedCount == 0) {
		return false;
	}
	return result;
};

export default {
	getAllChannels,
	getMessagesByChannelId,
	getUsersByChannelId,
	postMessageByChannelId,
	addChannel,
	deleteChannel,
};
