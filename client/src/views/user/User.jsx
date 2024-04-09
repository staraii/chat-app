import styles from "./user.module.css";
import { Outlet, Link, Navigate } from "react-router-dom";
import { useAuth } from "context/AuthContext.jsx";

function User() {
	const { isLoggedIn, logout, user, isDark, setTheme } = useAuth();

	if (!isLoggedIn) {
		return <Navigate to="/login" />;
	}
	return (
		<div className={styles.userDiv}>
			<header className={styles.header}>
				<h3>{user.username}</h3>
				{/* <figure className={styles.themeToggle} onClick={setTheme}>
					<figure
						className={
							isDark
								? styles.themeToggleDark
								: styles.themeToggleLight
						}
					></figure>
				</figure> */}

				<Link to="/" onClick={logout}>
					Logout
				</Link>
			</header>
				<Outlet />			
		</div>
	);
}

export default User;
