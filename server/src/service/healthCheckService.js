import { MongoClient } from "mongodb";

const check = async () => {
	return { status: "OK" };
};

const checkDb = async () => {
	const client = new MongoClient(process.env.MONGODB_URL);

	try {
		await client.connect();
		return { status: "OK" };
	} catch (err) {
		return { status: "Not OK!" };
	}
};

export default { check, checkDb };
