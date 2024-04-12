import jwtUtils from "../utils/jwtUtils.js";

function authorize(req, res, next) {
	// const bearer = req.headers["authorization"];
	const bearer = req.headers.authorization;
	try {
		if (bearer == undefined) {
			return res.status(400).send({ err: "Bad authorization header" });
		}
		const token = jwtUtils.verify(bearer.split(" ")[1]);
		if (this?.role && this.role != token.role) {
			return res
				.status(401)
				.send({ err: "User role not permitted access" });
		}
		res.locals.token;
	} catch (err) {
		console.log(err);
		if (err.name == "JsonWebTokenError") {
			return res
				.status(400)
				.send({ err: "Invalid authorization signature" });
		} else if (err.name == "TokenExpiredError") {
			return res.status(400).send({ err: "Authorization token expired" });
		}
	}
	next();
}
export default { authorize };
