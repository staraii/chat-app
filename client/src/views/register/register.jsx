import styles from "./register.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
function Register() {
	const [user, setUser] = useState({ username: "", password: "" });
	const handleInput = (e) => {
		const { name, value } = e.target;
		setUser((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};
	return (
		<main className={styles.main}>
			<h1 className={styles.h1}>Register</h1>
			<section className={styles.section}>
				<form className={styles.form}>
					<label htmlFor="username" className={styles.label}>
						Username:
					</label>
					<input
						type="text"
						id="username"
						name="password"
						className={styles.input}
						autoFocus
						value={user.username}
						onChange={handleInput}
					/>
					<label htmlFor="password" className={styles.label}>
						Password:
					</label>
					<input
						type="text"
						id="password"
						name="password"
						className={styles.input}
						value={user.password}
						onChange={handleInput}
					/>
					<button className={styles.button}>Register</button>
				</form>
			</section>
			<nav className={styles.nav}>
				<Link to="/" className={styles.link}>
					Home
				</Link>
				<Link to="/login" className={styles.link}>
					Login
				</Link>
			</nav>
		</main>
	);
}

export default Register;
