import styles from './register.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
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

        // Handle register
        console.log(formData);
    };

    return (
        <main className={styles.main}>
            <h1 className={styles.h1}>Register</h1>
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
                        type="password"
                        id="password"
                        name="password"
                        className={styles.input}
                        value={formData.password}
                        onChange={handleChange}
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
