import styles from "./home.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import MessagesList from "./components/MessagesList.jsx";
const socket = io("http://localhost:3000/broadcast", {
	autoConect: false,
});
function Home() {
	const [inputMsg, setInputMsg] = useState("");
	const [messages, setMessages] = useState([]);


	const fetchPosts = async () => {
		const response = await axios.get("http://localhost:3000/api/broadcast");
		const data = await response.data;
		setMessages([...data]);
		return data;
	};
	const sendBroadcast = async (msg) => {
		const response = await axios.post(
			"http://localhost:3000/api/broadcast",
			msg
		);
		console.log(response.data);
		fetchPosts();
		return response;
	};
	useEffect(() => {
		fetchPosts();
		socket.connect();
		function onConnect() {
			console.log("bc connected");
		}
		function onDisconnect() {
			console.log("bc disconnected");
		}
		function getBroadcast() {
			console.log("got broadcast");
			fetchPosts();
		}
		socket.on("connect", onConnect);
		socket.on("broadcast sent", getBroadcast);
		socket.on("disconnect", onDisconnect);

		return () => {
			socket.off("connect", onConnect);
			socket.off("broadcast sent", getBroadcast);
			socket.disconnect();
			socket.off("disconnect", onDisconnect);
			
		};
	}, []);
	const sendMsg = (e) => {
		e.preventDefault();
		const newMsg = { message: inputMsg, timeStamp: new Date() };
		socket.emit("client sent broadcast");
		sendBroadcast(newMsg);
		setInputMsg("");
	};

	return (
		<main className={styles.main}>
			<h1 className={styles.h1}>Welcome to Chat-App</h1>
			<section className={styles.section}>
				{messages.length > 0 && (
					<MessagesList
						messages={messages}
					/>
				)}
				<form className={styles.form} onSubmit={(e) => sendMsg(e)}>
					<input
						type="text"
						className={styles.input}
						value={inputMsg}
						autoComplete="off"
						onChange={(e) => setInputMsg(e.target.value)}
					/>
					<button
						type="submit"
						className={styles.button}
						disabled={inputMsg == ""}
					>
						Send
					</button>
				</form>
			</section>
			<nav className={styles.nav}>
				<Link to="/login" className={styles.link}>
					Login
				</Link>
				<Link to="/register" className={styles.link}>
					Register
				</Link>
			</nav>
		</main>
	);
}

export default Home;
