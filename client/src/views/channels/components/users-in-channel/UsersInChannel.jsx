import styles from "./users-in-channel.module.css";
import { useChat } from "context/ChatContext.jsx";
import { useAuth } from "context/AuthContext.jsx";
function UsersInChannel({ channels }) {
	const { currentChannel } = useChat();
	const { username } = useAuth;

	return (
		<section className={styles.section}>
			<ul className={styles.ul}>
				<li className={styles.li}>
					<h3 className={styles.h3}>Users online in channel</h3>
				</li>
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
