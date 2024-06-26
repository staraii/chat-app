import { fetchCollection } from "../mongodb/mongoDbClient.js";
import bcrypt from "bcrypt";

const USER_COLLECTION_NAME = "users";

const create = async ({ username, password }) => {
	const userExists = await fetchCollection(USER_COLLECTION_NAME).findOne({
		username: username,
	});
	if (userExists != null) {
		return false;
	} else {
		const hash = await bcrypt.hash(password, 12);
		const newUser = await fetchCollection(USER_COLLECTION_NAME).insertOne({
			username,
			hash,
			role: "USER",
		});
		return newUser;
	}
};

const exists = async ({ username, password }, afterValid) => {
	let data = await fetchCollection(USER_COLLECTION_NAME).findOne({
		username: username,
	});
	if (data == null) {
		throw new Error("Account do not exist");
	}
	bcrypt.compare(password, data.hash, (err, result) => {
		if (result) {
			return afterValid(data);
		} else {
			throw new Error("Account login failed");
		}
	});
};
export default { create, exists };
