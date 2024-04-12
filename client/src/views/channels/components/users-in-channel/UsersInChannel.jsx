import styles from "./users-in-channel.module.css";
import { useChat } from "context/ChatContext.jsx";
import { useAuth } from "context/AuthContext.jsx";
function UsersInChannel({ channels }) {
	const { currentChannel } = useChat();
	const { username } = useAuth;
	// const channel = channels.find((ch) => ch.channelName === currentChannel);
	// let users = channel.usersOnline.forEach((user, index) => {
	// 	if (user.username === username) {
	// 		return (
	// 			<li className={styles.self} key={index}>
	// 				{user.username}
	// 			</li>
	// 		);
	// 	} else {
	// 		return (
	// 			<li className={styles.li} key={index}>
	// 				{user.username}
	// 			</li>
	// 		);
	// 	}
	// });
	//let channel = channels.find((ch) => ch.channelName === currentChannel)
	// let onlineUsers = [
	// 	...channels.find((ch) => ch.channelName === currentChannel)
	// ];
	// let ch = channels.find((channel) => channel.channelName == currentChannel);
	// let us = ch.usersOnline;
	// console.log(us);
	return (
		<section className={styles.section}>
			<h3 className={styles.h3}>Users online</h3>
			<ul className={styles.ul}>
				{/* {inChannel &&
					inChannel.map((user, index) => {
						return (
							<li className={styles.li} key={index}>
								{user.username}
							</li>
						);
					})} */}
				{/* {users && users} */}
				{/* {us &&
					us.map((user, index) => {
						<li key={index}>
							<p>{user[0]}</p>
						</li>;
					})} */}
			</ul>
		</section>
	);
}

export default UsersInChannel;
