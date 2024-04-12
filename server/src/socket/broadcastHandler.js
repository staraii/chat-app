function broadcastHandler(io) {
	io.on("connection", (socket) => {
		console.log("connected");
		socket.on("client sent broadcast", (msg) => {
			console.log("client sent broadcast")
			io.emit("broadcast sent", "broadcast sent");
		});
		socket.on("disconnect", () => {
			console.log("broadcast disconnected")
			socket.disconnect();
		})
	});
	
}

export default broadcastHandler;
