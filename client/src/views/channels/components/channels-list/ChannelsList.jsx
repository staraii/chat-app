import styles from "./channelsList.module.css";
import { useAuth } from "context/AuthContext.jsx";
import { useChat } from "context/ChatContext.jsx";
import axios from "axios";

// Base url för endpoints
const API_URL = "http://localhost:3000/api/channels";

function ChannelsList() {
	const { user } = useAuth();
	const {
		channelNames,
		currentChannel,
		setCurrentChannel,
		channelMod,
		setChannelMod,
		channelsData,
		setMessagesInChannel,
	} = useChat();

	//Auth header
	const headers = {
		"Content-Type": "application/json",
		authorization: `Bearer ${user.token}`,
	};
	const getMessages = async (id) => {
		const response = await axios.get(`${API_URL}/${id}`, {
			headers,
		});
		response.data;
		setMessagesInChannel(response.data);
		//return response.data;
	};
	const setOption = (val) => {
		setCurrentChannel(val);
		const thisChannel = channelsData.find((ch) => ch._id === val);
		setChannelMod(thisChannel.ownedBy);
		getMessages(val);
	};
	return (
		<div className={styles.div}>
			<h3>#Channels</h3>
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
					<p>You are moderator for this channel</p>
					<button>Delete channel</button>
				</div>
			)}
		</div>
	);
}

export default ChannelsList;
