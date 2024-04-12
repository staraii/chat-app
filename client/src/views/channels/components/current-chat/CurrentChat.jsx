import styles from "./currentChat.module.css";
import { useChat } from "context/ChatContext.jsx";
import { useAuth } from "context/AuthContext.jsx";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

// Base url för endpoints
const API_URL = "http://localhost:3000/api/channels";
function CurrentChat() {
	const [messages, setMessages] = useState([]);
	const msgListRef = useRef(null);
	const userLocale = navigator.language;
	//Chat Context
	const { currentChannel, messagesInChannel } = useChat();

	// AuthContext
	const { user } = useAuth();

	useEffect(() => {
		msgListRef.current?.lastElementChild?.scrollIntoView();
	}, [messagesInChannel]);
	return (
		<ul className={styles.ul} ref={msgListRef}>
			{messagesInChannel.length == 0 ? (<p>Choose a channel to start chatting</p>) : null}
			{messagesInChannel &&
				(messagesInChannel.map((msg, index) => {
					return (
						<li className={styles.li} key={index}>
							<div className={styles.div}></div>
							<p>{msg.username}</p>
							<p>{msg.message}</p>
						</li>
					);
				}))}
		</ul>
	);
}

export default CurrentChat;
