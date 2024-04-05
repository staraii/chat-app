import { fetchCollection } from "../mongodb/mongoDbClient.js";
import dateTimeUtil from "../utils/dateTimeUtil.js";

const ORDER_COLLECTION_NAME = "channels";

const orders = [];
const query = { channelName: "broadcast" };
const getAllBroadcasts = async () => {
	const projection = { messages: 1 };
	const cursor = await fetchCollection(ORDER_COLLECTION_NAME).find(query, {
		projection,
	});
	const result = await cursor.toArray();
	return result;
};

const postBroadcast = async (message) => {
	const { date, time, now } = dateTimeUtil();
	const newMessage = { date, time, now, message };
	return await fetchCollection(ORDER_COLLECTION_NAME).findOneAndUpdate(
		query,
		{ $push: { messages: newMessage } }
	);
};

export default {
	getAllBroadcasts,
	postBroadcast,
};
