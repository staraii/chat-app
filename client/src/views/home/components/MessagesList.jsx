import styles from "./messagesList.module.css";
import Message from "./Message.jsx";
import { useEffect, useRef } from "react";

function MessagesList({ isLoading, isError, messages }) {
	const listRef = useRef(null);
	useEffect(() => {
		listRef.current?.lastElementChild?.scrollIntoView()
	}, [messages]);
	const userLocale = navigator.language;
	return (
		<ul className={styles.ul} ref={listRef}>
			{isLoading && <li>Loading...</li>}
			{isError && <li>Error...</li>}
			{messages &&
				messages.map((msg, index) => {
					return (
						<Message
							key={index}
							msg={msg.message}
							userLocale={userLocale}
							timeStamp={msg.timeStamp}
						/>
					);
				})}
		</ul>
	);
}

export default MessagesList;
