import styles from "./channelsList.module.css";
import { useAuth } from "context/AuthContext.jsx";
import { useChat } from "context/ChatContext.jsx";
import { useState } from "react";
import axios from "axios";

// Base url för endpoints
const API_URL = "http://localhost:3000/api/channels";

function ChannelsList() {
	const [channel, setChannel] = useState([]);
	const { user } = useAuth();
	const {
		channelNames,
		currentChannel,
		setCurrentChannel,
		channelMod,
		setChannelMod,
		channelsData,
	} = useChat();
	//Auth header
	const headers = {
		"Content-Type": "application/json",
		authorization: `Bearer ${user.token}`,
	};

	const setOption = (val) => {
		setCurrentChannel(val);
		const thisChannel = channelsData.find((ch) => ch._id === val);
		setChannelMod(thisChannel.ownedBy);
	};
	const deleteChannel = async () => {
		const response = await axios.delete(`${API_URL}/${currentChannel}`, {
			headers
		});
		console.log(response.data);
		const data = response.data;
		return data;
	};
	return (
		<div className={styles.div}>
			<select
				className={styles.select}
				value={currentChannel}
				onChange={(e) => setOption(e.target.value)}
			>
				{channelNames &&
					channelNames.map((value) => {
						let [key, val] = Object.entries(value)[0];
						return (
							<option
								key={key}
								className={styles.option}
								value={val}
							>
								{key}
							</option>
						);
					})}
			</select>

			{channelMod == user.username && (
				<div className={styles.mod}>
					<p className={styles.pMod}>
						You are moderator for this channel
					</p>
					<button
						onClick={deleteChannel}
						className={styles.deleteChannel}
					>
						Delete channel
					</button>
				</div>
			)}
		</div>
	);
}

export default ChannelsList;
