import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import broadcastRouter from "./server/src/router/broadcastRouter.js";
import authRouter from "./server/src/router/authRouter.js";
import channelsRouter from "./server/src/router/channelsRouter.js";
import broadcastHandler from "./server/src/socket/broadcastHandler.js";
import channelHandler from "./server/src/socket/channelHandler.js";

// Hämtar port från .env, annars default 3000
const PORT = process.env.PORT || 3000;

// Server
const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*",
	},
});


// Middleware
app.use(cors());
app.use(express.json());

// IO namespaces
const broadcastNsp = io.of("/broadcast");
const channelsNsp = io.of("/channels");
const adminNsp = io.of("/admin");


broadcastHandler(broadcastNsp);
// channelsHandler(channelsNsp);
// adminHandler(adminNsp);




//Routers
app.use("/api/broadcast", broadcastRouter);
app.use("/api/auth", authRouter);
app.use("/api/channels", channelsRouter);

server.listen(PORT, async () => {
	console.log("Server is running on port: " + PORT);
});
