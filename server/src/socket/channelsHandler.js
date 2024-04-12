//import InMemorySessionStore from "./sessionStore.js";
//const SessionStore = new InMemorySessionStore();
//import InMemoryMessageStore from "./messageStore.js";
//const MessageStore = new InMemoryMessageStore();
//import crypto from "crypto";
//const randomId = () => crypto.randomBytes(8).toString("hex");

function channelHandler(io) { 
	// io.use((socket, next) => {
	// 	const sessionId = socket.handshake.auth.sessionId;
	// 	if (sessionId) {
	// 		const session = SessionStore.findSession(sessionId);
	// 		if (session) {
	// 			socket.sessionId = sessionId;
	// 			socket.userId = session.userId;
	// 			socket.username = session.username;
	// 			return next();
	// 		}
	// 	}

	// 	const username = socket.handshake.auth.username; 
	// 	console.log(username);
	// 	if (!username) {
	// 		return next(new Error("invalid username"));
	// 	}
	// 	socket.sessionId = randomId();
	// 	socket.userId = randomId();
	// 	socket.username = username;
	// 	next();
	// });
	// io.on("connection", (socket) => {
	// 	SessionStore.saveSession(socket.sessionId, {
	// 		userId: socket.userId,
	// 		username: socket.username,
	// 		connected: true,
	// 	});
	// 	const users = [];
	// 	const messagesPerUser = new Map();
	// 	MessageStore.findMessagesForUser(socket.userId).forEach((message) => {
	// 		const { from, to } = message;
	// 		const otherUser = socket.userId === from ? to : from;
	// 		if (messagesPerUser.has(otherUser)) {
	// 			messagesPerUser.get(otherUser).push(message);
	// 		} else {
	// 			messagesPerUser.set(otherUser, [message]);
	// 		}
	// 	});
	// 	SessionStore.findAllSessions().forEach((session) => {
	// 		users.push({
	// 			userId: session.userId,
	// 			username: session.username,
	// 			connected: session.connected,
	// 			messages: messagesPerUser.get(session.userId) || [],
	// 		});
	// 	});
	// 	for (let [id, socket] of io.sockets) {
	// 		users.push({ userId: id, username: socket.username });
	// 	}
	// 	socket.emit("session", {
	// 		sessionId: socket.sessionId,
	// 		userId: socket.userId,
	// 	});
	// 	socket.emit("users", users);
	// 	socket.broadcast.emit("user connected", {
	// 		userId: socket.id,
	// 		username: socket.username,
	// 	});
	// 	socket.join(socket.userId);

	// 	socket.on("private message", ({ content, to }) => {
	// 		const message = { content, from: socket.userId, to };
	// 		socket
	// 			.to(to)
	// 			.to(socket.userId)
	// 			.emit("private message", { content, from: socket.userId, to });
	// 		MessageStore.saveMessage(message);
	// 	});
	// 	socket.on("disconnect", async () => {
	// 		const matchingSockets = await io.in(socket.userId).allSockets();
	// 		const isDisconnected = matchingSockets.size === 0;
	// 		if (isDisconnected) {
	// 			socket.broadcast.emit("user disconnected", socket.userId);
	// 			SessionStore.saveSession(socket.sessionId, {
	// 				userId: socket.userId,
	// 				username: socket.username,
	// 				connected: false,
	// 			});
	// 		}
	// 	});

	// });

	// io.on("disconnect", () => {
	// 	console.log("User disconnected from channel namespace");
	// });
}
export default channelHandler;
