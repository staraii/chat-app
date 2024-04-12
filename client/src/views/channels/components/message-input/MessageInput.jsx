import styles from "./messageInput.module.css";
import { useState } from "react";
import { useChat } from "context/ChatContext.jsx";
import { useAuth } from "context/AuthContext.jsx";
import axios from "axios";

// Base url för endpoints
const API_URL = "http://localhost:3000/api/channels";

function MessageInput() {
	const [inputMsg, setInputMsg] = useState("");
	//Chat Context
	const {
		setChannelsData,
		channelsData,
		setChannelNames,
		currentChannel,
		setChannelMod,
	} = useChat();
	// AuthContext
	const { user } = useAuth();
	//Auth header
	const headers = {
		"Content-Type": "application/json",
		authorization: `Bearer ${user.token}`,
	};
	// Hämtar alla kanaler
	const postMessage = async (msg) => {
		try {
			const response = await axios.post(
				`${API_URL}/${currentChannel}`,
				msg,
				{
					headers,
				}
			);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};
	const sendMsg = (e) => {
		e.preventDefault();
		const newMsg = {
			username: user.username,
			message: inputMsg,
			timeStamp: new Date(),
		};
		// socket.emit("broadcastMsg", newMsg);
		postMessage(newMsg);
		setInputMsg("");
	};
	return (
		<footer className={styles.chatFooter}>
			<form className={styles.form} onSubmit={(e) => sendMsg(e)}>
				<input
					autoFocus
					type="text"
					className={styles.input}
					value={inputMsg}
					onChange={(e) => setInputMsg(e.target.value)}
				/>
				<button type="submit" className={styles.button}>
					Send
				</button>
			</form>
		</footer>
	);
}

export default MessageInput;
