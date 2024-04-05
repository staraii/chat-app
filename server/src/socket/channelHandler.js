function channelHandler(channelNsp, socket, next) {
	channelNsp.on("connection", (socket) => {
		console.log("Annonymus connected to channel namespace");

		socket.on("channel message", (msg) => {
			console.log("message recieved");
			channelNsp.emit("channel message", msg);
		});

		socket.on("disconnect", () => {
			console.log("User disconnected from channel namespace");
		});
	});
}
export default channelHandler;
