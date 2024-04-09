import { fetchCollection } from "../mongodb/mongoDbClient.js";


const CHANNELS_COLLECTION_NAME = "channels";

const query = { channelName: "broadcast" };
const getAllBroadcasts = async () => {
	const projection = { messages: 1 };
	const cursor = await fetchCollection(CHANNELS_COLLECTION_NAME).find(query, {
		projection,
	});
	const result = await cursor.toArray();
	return result;
};

const postBroadcast = async (message) => {
	const timeStamp = new Date();
	const newMessage = { timeStamp, message: message.message };
	return await fetchCollection(CHANNELS_COLLECTION_NAME).findOneAndUpdate(
		query,
		{ $push: { messages: newMessage } }
	);
};

export default {
	getAllBroadcasts,
	postBroadcast,
};
