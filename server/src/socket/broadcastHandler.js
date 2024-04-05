function broadcastHandler(io) {
	console.log(io)
	io.on("connection", function (socket) {
		console.log("socket!!!");
		socket.emit("greeting-from-server", {
			greeting: "Hello Client",
		});
		socket.on("greeting-from-client", function (message) {
			console.log(message);
		});
		
	});
}
export default broadcastHandler;
