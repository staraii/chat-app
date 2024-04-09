import styles from "./channels.module.css";
import ChannelsList from "./components/channels-list/ChannelsList.jsx";
import MessageInput from "./components/message-input/MessageInput.jsx";
import CurrentChat from "./components/current-chat/CurrentChat.jsx";
function Channels() {
	return (
		<section className={styles.chatSection}>
			<div className={styles.chatContainer}>
				<ChannelsList />
				<CurrentChat />
			</div>
			
			<MessageInput />
		</section>
	);
}

export default Channels