import { useState } from "react";
import dateTimeUtil from "utils/dateTimeUtil.js";
import styles from "./message.module.css";
function Message({ msg, timeStamp, userLocale }) {
	const [isOpen, setIsOpen] = useState(false);
	let { date, time } = dateTimeUtil(timeStamp, userLocale);
	return (
		
		<li className={styles.li} onClick={() => setIsOpen(!isOpen)}>
			<time className={styles.time}>{time}</time>
			<div className={styles.div}>
				<span className={styles.span}>{msg}</span>
				{isOpen ? <time className={styles.date}>{date}</time> : null}
			</div>
		</li>
	);
}

export default Message;
