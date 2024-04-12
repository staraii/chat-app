function broadcastHandler(io) {
	io.on("connection", (socket) => {
		console.log("unid connected to broadcast");
		socket.on("broadcastMsg", (msg) => {
			//const { message, timeStamp } = msg;
			//console.log("msg:" + message + timeStamp);
			io.emit("broadcastMsg", msg);
		});
		socket.on("disconnect", (msg) => { 
			console.log("broadcast disconnected")
		})
	});
	
}

export default broadcastHandler;
