import { useState } from "react";
import dateTimeUtil from "utils/dateTimeUtil.js";
import styles from "./channelMessage.module.css";
import { useAuth } from "context/AuthContext.jsx";
function ChannelMessage({ msg, username, timeStamp, userLocale, id }) {
	const [isOpen, setIsOpen] = useState(false);
	// AuthContext
	const { user } = useAuth();

	// Omvandlar timestamp till lokal tid och format
	const { date, time } = dateTimeUtil(timeStamp, userLocale);

	// Kontrollerar om meddelandet är användarens egna

	return (
		<li className={styles.li} onClick={() => setIsOpen(!isOpen)}>
			<div className={styles.container}>
				
				<p className={styles.pUser}>{username}</p>
				<div className={styles.divMsg}>
					<span className={styles.time}>{time}</span>
					{user.username === username ? (<p className={styles.usersMsg}>{msg}</p>) : (<p className={styles.msg}>{msg}</p>)}
				</div>
				{isOpen && <p className={styles.date}>{date}</p>}
			</div>

		</li>
	);
}

export default ChannelMessage;
