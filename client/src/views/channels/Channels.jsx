import styles from "./channels.module.css";
import MessageInput from "./components/message-input/MessageInput.jsx";
import CurrentChannel from "./components/current-channel/CurrentChannel.jsx";
import CurrentChat from "./components/current-chat/CurrentChat.jsx";

function Channels() {
	return (
		<section className={styles.chatSection}>
			<div className={styles.chatContainer}>
				<CurrentChannel />
				<CurrentChat />
			</div>
			<MessageInput />
		</section>
	);
}

export default Channels;
