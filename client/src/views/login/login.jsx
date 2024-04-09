import styles from './login.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Handle login
        console.log(formData);
    };

    return (
        <main className={styles.main}>
            <h1 className={styles.h1}>Login</h1>
            <section className={styles.section}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label htmlFor="username" className={styles.label}>
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className={styles.input}
                        autoFocus
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <label htmlFor="password" className={styles.label}>
                        Password:
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        className={styles.input}
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button type="submit" className={styles.button}>
                        Login
                    </button>
                </form>
            </section>
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
