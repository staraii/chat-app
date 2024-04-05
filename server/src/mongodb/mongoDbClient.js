import { MongoClient } from "mongodb";
let db;

export function fetchCollection(name) {
	return fetchDatabase().collection(name);
}

function fetchDatabase() {
	if (db != undefined) {
		return db;
	}

	const client = new MongoClient(process.env.MONGODB_URL);

	db = client.db("chat-app");
	return db;
}
