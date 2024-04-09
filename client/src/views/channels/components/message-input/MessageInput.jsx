import styles from "./messageInput.module.css";

function MessageInput() {
	return (
		<footer className={styles.chatFooter}>
			<form className={styles.form}>
				<input autoFocus type="text" className={styles.input} />
				<button type="submit" className={styles.button}>
					Send
				</button>
			</form>
		</footer>
	);
}

export default MessageInput;
