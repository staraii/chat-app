import { fetchCollection } from "../mongodb/mongoDbClient.js";


const BROADCASTS_COLLECTION_NAME = "broadcasts";

const query = { channelName: "broadcast" };
const getAllBroadcasts = async () => {
	const projection = { messages: 1 };
	const cursor = await fetchCollection(BROADCASTS_COLLECTION_NAME).find({});
	const result = await cursor.toArray();
	return result;
};

const postBroadcast = async (message) => {
	const timeStamp = new Date();
	const newMessage = { timeStamp, message: message.message };
	return await fetchCollection(BROADCASTS_COLLECTION_NAME).insertOne(newMessage);
};

export default {
	getAllBroadcasts,
	postBroadcast,
};
