import styles from "./register.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
function Register() {
	const [user, setUser] = useState({ username: "", password: "" });
	const mutation = useMutation({
		mutationFn: (event) => {
			event.preventDefault();
			return axios.post(
				"http://localhost:3000/api/auth/register",
				{username: user.username, password: user.password}
			);
		},
	});
	const handleInput = (e) => {
		const { name, value } = e.target;
		setUser((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};
	const reset = () => {
		mutation.reset();
		setUser({username: "", password: ""});
	}
	return (
		<main className={styles.main}>
			<h1 className={styles.h1}>Register</h1>
			{mutation.error ? (
				<h1 onClick={() => reset()} className={styles.h1}>
					Registration failed, please try again
				</h1>
			) : null}
			{mutation.isSuccess ? (
				<Link to="/login" className={styles.link}>
					<h1 className={styles.h1}>Account created</h1>
					<h1 className={styles.h1Login}>Login</h1>
				</Link>
			) : null}
			{mutation.error || mutation.isSuccess ? null : (
				<section className={styles.section}>
					<form className={styles.form} onSubmit={mutation.mutate}>
						<label htmlFor="username" className={styles.label}>
							Username:
						</label>
						<input
							type="text"
							id="username"
							name="username"
							className={styles.input}
							autoFocus
							value={user.username}
							onChange={handleInput}
						/>
						<label htmlFor="password" className={styles.label}>
							Password:
						</label>
						<input
							type="password"
							id="password"
							name="password"
							className={styles.input}
							value={user.password}
							onChange={handleInput}
						/>
						<button type="submit" className={styles.button}>
							Register
						</button>
					</form>
				</section>
			)}
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
