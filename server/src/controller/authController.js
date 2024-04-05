import authService from "../service/authService.js";
import jwtUtils from "../utils/jwtUtils.js";

const login = (req, res) => {
	const { username, password } = req.body;
	//console.log(req.body);
	if (username == undefined || password == undefined) {
		return res.status(400).send({ msg: "Invalid login parameters" });
	}
	authService
		.exists({ username, password }, (user) => {
			const token = jwtUtils.generate({ username, role: user.role });
			return res.status(200).send({ token, role: user.role });
		})
		.catch((err) => {
			return res.status(401).send({ err: "Invalid login attempt" });
		});
};

const register = async (req, res) => {
	const { username, password } = req.body;
	if (username == undefined || password == undefined) {
		//console.log("invalid parameters");
		return res.status(400).json({ error: "Invalid registration parameters" });
	}
	const result = await authService.create({ username, password });
	//console.log(result);
	if (result.insertedId == undefined) {
		console.log("400 invalid parameters");
		return res.status(400).json({ error: "Invalid account parameters" });
	}
	//console.log("success, account created");
	return res.status(201).json({ msg: "Account created" });
};

export default { login, register };
