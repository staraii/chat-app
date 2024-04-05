import styles from "./home.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
function Home() {
	const [message, setMessage] = useState("");
	const socket = io("http://localhost:3000");
	useEffect(() => {
		socket.connect();

		return () => {
			socket.disconnect();
		};
	}, []);

	const fetchPosts = async () => {
		const response = await axios.get("http://localhost:3000/api/broadcast");
		return response.data;
	};
	const { data, error, isError, isLoading } = useQuery({
		queryKey: ["posts"],
		queryFn: fetchPosts,
	});
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error! {error.message}</div>;
	}

	const msgArr = [...data[0].messages];
	console.log(msgArr);


	return (
		<main className={styles.main}>
			<h1 className={styles.h1}>Welcome to Chat-App</h1>
			<section className={styles.section}>
				<ul className={styles.ul}>
					{" "}
					{msgArr.map((msg, index) => (
						<li key={index}>
							{/* {msg.message.message} */}
							{msg.time}
						</li>
					))}
				</ul>
				<form className={styles.form}>
					<input
						type="text"
						className={styles.input}
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<button className={styles.button}>Send</button>
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
