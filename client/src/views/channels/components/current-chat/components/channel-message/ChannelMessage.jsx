import { useState } from "react";
import dateTimeUtil from "utils/dateTimeUtil.js";
import styles from "./channelMessage.module.css";
import { useAuth } from "context/AuthContext.jsx";
function ChannelMessage({ msg, username, timeStamp, userLocale, id }) {
	const [isOpen, setIsOpen] = useState(false);
	// AuthContext
	const { user } = useAuth();
	// let { date, time } = dateTimeUtil(timeStamp, userLocale);
	return (
		<li className={(username === user.username ? "styles.ownMessage" : "styles.others")} onClick={() => setIsOpen(!isOpen)}>
			<p className={styles.user}>{username}</p>
			<div className={styles.div}>
				<p className={styles.span}>{msg}</p>

				{/* {isOpen ? (
					<div className={styles.timeDate}>
						<time className={styles.time}>{time}</time>
						<time className={styles.date}>{date}</time>
					</div>
				) : null} */}
			</div>
		</li>
	);
}

export default ChannelMessage;
