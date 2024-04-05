import jwt from "jsonwebtoken";

function generate(claims) {
	let options = {
		issuer: "chat-app-api",
		subject: "Auth token for chat-app api",
		expiresIn: "45m",
	};
	return jwt.sign(claims, process.env.JWT_SECRET_KEY, options);
}

function verify(token) {
	return jwt.verify(token, process.env.JWT_SECRET_KEY);
}
export default { generate, verify };
