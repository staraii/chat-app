import styles from "./user.module.css";
import { Outlet, Link, Navigate } from "react-router-dom";
import { useAuth } from "context/AuthContext.jsx";
import { useChat } from "context/ChatContext.jsx";


function User() {
	const { isLoggedIn, logout, user, isDark, setTheme } = useAuth();
	const { inChannel, messages, channels, joinChannel } = useChat();


	// const socket = io("http://localhost:3000/channels", {
	// 	autoConect: false,
	// });

	if (!isLoggedIn) {
		return <Navigate to="/login" />;
	}
	return (
		<div className={styles.userDiv}>
			<header className={styles.header}>
				<h3>{user.username}</h3>
				<Link to="/" onClick={logout}>
					Logout
				</Link>
			</header>
			<Outlet />
		</div>
	);
}

export default User;
