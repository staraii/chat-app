import styles from "./user.module.css";
import { Outlet, Link, Navigate } from "react-router-dom";
import { useAuth } from "context/AuthContext.jsx";
import { useChat } from "context/ChatContext.jsx";
import { useState } from "react";


import axios from "axios";


// Base url för endpoints
const API_URL = "http://localhost:3000/api/channels";
function User() {
	const { isLoggedIn, logout, user } = useAuth();
	const { inChannel, messages, channels, joinChannel } = useChat();
	const [newChannelName, setNewChannelName] = useState("");
	const [showCreateChannel, setShowCreateChannel] = useState(false);
	//Auth header
	const headers = {
		"Content-Type": "application/json",
		authorization: `Bearer ${user.token}`,
	};


	const createChannel = async () => {
		setShowCreateChannel(false);
		const newChannel = {
			channelName: newChannelName,
			ownedBy: user.username,
		};
		const response = await axios.put(`${API_URL}`, newChannel, {
			headers,
		});
		setNewChannelName("");
		console.log(response.data);
		return response.data;
	};
	if (!isLoggedIn) {
		return <Navigate to="/login" />;
	}
	return (

			<div className={styles.userDiv}>
				<header className={styles.header}>
					<button
						type="button"
						className={styles.createChannel}
						onClick={() => setShowCreateChannel(true)}
					>
						Create new channel
					</button>
					<h3>{user.username}</h3>
					<Link to="/" onClick={logout} className={styles.logout}>
						Logout
					</Link>
					{showCreateChannel && (
						<div className={styles.createChannelBack}>
							<div className={styles.createChannelModul}>
								<h3>Choose channel name</h3>
								<input
									className={styles.channelInput}
									type="text"
									name="text"
									id="text"
									value={newChannelName}
									onChange={(e) =>
										setNewChannelName(e.target.value)
									}
								/>
								<button
									onClick={createChannel}
									className={styles.buttonOk}
									type="button"
								>
									Create channel
								</button>
								<button
									className={styles.buttonNo}
									onClick={() => setShowCreateChannel(false)}
									type="button"
								>
									Close
								</button>
							</div>
						</div>
					)}
				</header>
				<Outlet />
			</div>
	
	);
}

export default User;
