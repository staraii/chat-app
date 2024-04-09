import styles from "./home.module.css";
import { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import MessagesList from "./components/MessagesList.jsx";

function Home() {
	const [inputMsg, setInputMsg] = useState("");
	const [messages, setMessages] = useState([]);
	const mutation = useMutation({
		mutationFn: (newMsg) => {
			return axios.post("http://localhost:3000/api/broadcast", newMsg);
		},
	});
	const socket = io("http://localhost:3000/broadcast", {
		autoConect: false,
	});
	const fetchPosts = async () => {
		const response = await axios.get("http://localhost:3000/api/broadcast");
		const data = [...response.data[0].messages];
		return data;
	};
	const { data, error, isError, isLoading } = useQuery({
		queryKey: ["posts"],
		queryFn: fetchPosts,
	});
	useEffect(() => {
		if (data) {
			setMessages([...data]);
		}
	}, [data]);
	useEffect(() => {
		socket.connect();
		function onConnect() {
			console.log("connected");
		}
		function onDisconnect() {
			console.log("disconnected");
		}
		function recievedBroadcast(msg) {
			setMessages((messages) => [...messages, msg]);
		}
		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);
		socket.on("broadcastMsg", recievedBroadcast);

		return () => {
			socket.off("connect", onConnect);
			socket.off("broadcastMsg", recievedBroadcast);
			socket.disconnect();
			socket.off("disconnect", onDisconnect);
		};
	}, []);
	const sendMsg = (e) => {
		e.preventDefault();
		const newMsg = { message: inputMsg, timeStamp: new Date() };
		socket.emit("broadcastMsg", newMsg);
		mutation.mutate(newMsg);
		setInputMsg("");
	};

	return (
		<main className={styles.main}>
			<h1 className={styles.h1}>Welcome to Chat-App</h1>
			<section className={styles.section}>
				{messages.length > 0 && (
					<MessagesList
						isLoading={isLoading}
						isError={isError}
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
