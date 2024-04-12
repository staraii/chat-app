import styles from "./channels.module.css";
import MessageInput from "./components/message-input/MessageInput.jsx";
import CurrentChannel from "./components/current-channel/CurrentChannel.jsx";
import CurrentChat from "./components/current-chat/CurrentChat.jsx";
import { useChat } from "context/ChatContext.jsx";
import { useAuth } from "context/AuthContext.jsx";
import { useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

// Base url för endpoints
const API_URL = "http://localhost:3000/api/channels";

// instans av socket.io, "channels" namespace
// const socket = io("http://localhost:3000/channels", {
// 	autoConect: false,
// });
function Channels() {
	//Chat Context
	const { channelsData, currentChannel, handleFetchedData } = useChat();
	// AuthContext
	const { user } = useAuth();

	//Auth header
	const headers = {
		"Content-Type": "application/json",
		authorization: `Bearer ${user.token}`,
	};
	// Hämtar alla kanaler
	const getChannels = async () => {
		const response = await axios.get(`${API_URL}`, { headers });
		const data = await response.data;
		handleFetchedData(data);
	};
	useEffect(() => {
		getChannels();

		// const channelDeleted = () => {
		// 	getChannels();
		// }
		// socket.on("channel-deleted", channelDeleted);
		// socket.connect();

		// function onConnect() {
		// 	console.log("chat connected");
		// 	socket.emit("newUser", {
		// 		username: user.username,
		// 		socketId: socket.id,
		// 	});
		// }
		// function onDisconnect() {
		// 	console.log("chat disconnected");
		// }
		// function getBroadcast() {
		// 	console.log("got broadcast");
		// }
		// socket.on("connect", onConnect);
		// //socket.on("newUserResponse", (data) => set);
	
		// socket.on("broadcast sent", getBroadcast);
		// socket.on("disconnect", onDisconnect);

		// return () => {
		// 	socket.off("connect", onConnect);
		// 	socket.off("broadcast sent", getBroadcast);
		// 	socket.disconnect();
		// 	socket.off("disconnect", onDisconnect);
		// };
	
	}, []);
		
	return (
		<section className={styles.chatSection}>
			{channelsData.length > 0 && (
				<div className={styles.chatContainer}>
					<CurrentChannel  />
					<CurrentChat />
				</div>
			)}

			<MessageInput  />
		</section>
	);
}

export default Channels;
