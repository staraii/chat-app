
function broadcastHandler(io) {
	io.on("connection", (socket) => {
		socket.on("broadcastMsg", (msg) => {
			//const { message, timeStamp } = msg;
			//console.log("msg:" + message + timeStamp);
			io.emit("broadcastMsg", msg);
		});
	
	});
}

export default broadcastHandler;
