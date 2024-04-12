import styles from "./currentChat.module.css";
import { useChat } from "context/ChatContext.jsx";
import { useAuth } from "context/AuthContext.jsx";
import { useState, useEffect, useRef } from "react";
import ChannelMessage from "./components/channel-message/ChannelMessage.jsx";
import axios from "axios";

// Base url för endpoints
const API_URL = "http://localhost:3000/api/channels";
function CurrentChat() {
	const [messages, setMessages] = useState([]);
	const msgListRef = useRef(null);
	const userLocale = navigator.language;
	//Chat Context
	const { currentChannel } = useChat();
	// AuthContext
	const { user } = useAuth();
	//Auth header
	const headers = {
		"Content-Type": "application/json",
		authorization: `Bearer ${user.token}`,
	};
	const getMessages = async () => {
		const response = await axios.get(`${API_URL}/${currentChannel}`, {
			headers,
		});
		console.log(response.data);
		const data = response.data;
		setMessages(data);
		return data;
	};
	useEffect(() => {
		msgListRef.current?.lastElementChild?.scrollIntoView();
	}, [messages]);
	useEffect(() => {
		getMessages();
	}, [currentChannel])
	useEffect(() => {
		getMessages();
	}, []);
	return (
		<ul className={styles.ul} ref={msgListRef}>
			{messages.length == 0 ? (
				<p>Choose a channel to start chatting</p>
			) : null}
			{messages &&
				messages.map((msg, index) => {
					return (
						<ChannelMessage
							key={index}
							id={msg._id}
							username={msg.username}
							msg={msg.message}
							timeStamp={msg.timeStamp}
							userLocale={userLocale}
						/>
					);
				})}
		</ul>
	);
}

export default CurrentChat;
