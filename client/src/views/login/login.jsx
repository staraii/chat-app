import styles from "./login.module.css";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "context/AuthContext.jsx";
import axios from "axios";
function Login() {
	const [loginData, setLoginData] = useState({ username: "", password: "" });
	const {login} = useAuth();
	const mutation = useMutation({
		mutationFn: (event) => {
			event.preventDefault();
			return axios.post("http://localhost:3000/api/auth/login", {
				username: loginData.username,
				password: loginData.password,
			});
		},
		onSuccess: (data) => {
			login(data.data);
		},
	});
	const handleInput = (e) => {
		const { name, value } = e.target;
		setLoginData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};
	const reset = () => {
		mutation.reset();
		setLoginData({ username: "", password: "" });
	};
	if (mutation.isSuccess) {
		return <Navigate to="/user/channels" />;
	}
	return (
		<main className={styles.main}>
			<h1 className={styles.h1}>Login</h1>

			{mutation.error ? (
				<div onClick={() => reset()}>
					<h1 className={styles.h1}>Login failed</h1>
					<h1 className={styles.h1}>try again</h1>
				</div>
			) : (
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
							value={loginData.username}
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
							value={loginData.password}
							onChange={handleInput}
						/>
						<button type="submit" className={styles.button} disabled={loginData.username == "" || loginData.password == ""}>
							Login
						</button>
					</form>
				</section>
			)}
			<nav className={styles.nav}>
				<Link to="/" className={styles.link}>
					Home
				</Link>
				<Link to="/register" className={styles.link}>
					Register
				</Link>
			</nav>
		</main>
	);
}

export default Login;
