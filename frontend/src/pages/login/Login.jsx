import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import { getSavedToken, requestJson, saveToken } from "../../api";
import styles from "./styles.module.scss";

export default function Login() {
    const navigate = useNavigate();
    const [token, setToken] = useState(getSavedToken);
    const [inputs, setInputs] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (token) navigate("/search", { replace: true });
    }, [navigate, token]);

    const handleChange = (event) => {
        setInputs((current) => ({ ...current, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            const result = await requestJson("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: inputs.email.trim().toLowerCase(), password: inputs.password }),
            });
            if (!result.token) throw new Error("The server did not return a login token.");
            if (!saveToken(result.token)) throw new Error("This browser could not save the login. Enable local storage and try again.");
            setToken(result.token);
            navigate("/search", { replace: true });
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : "Login failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.content}>
                <h1>Sign in</h1>
                <p>Use a demo account to search the TVMaze catalog.</p>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.loginSection}>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" name="email" autoComplete="username" maxLength={254} placeholder="Enter your email" onChange={handleChange} value={inputs.email} required />
                    </div>
                    <div className={styles.loginSection}>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" name="password" autoComplete="current-password" maxLength={72} placeholder="Enter your password" onChange={handleChange} value={inputs.password} required />
                    </div>
                    <button type="submit" className={styles.submit} disabled={isSubmitting}>
                        {isSubmitting ? "Signing in..." : "Sign in"}
                    </button>
                    {error && <p className={styles.response} role="alert">{error}</p>}
                </form>
                <details className={styles.demoCredentials}>
                    <summary>Demo accounts</summary>
                    <ul>
                        <li><code>user1@mail.com</code> / <code>password1</code></li>
                        <li><code>user2@mail.com</code> / <code>password2</code></li>
                        <li><code>user3@mail.com</code> / <code>password3</code></li>
                    </ul>
                    <p>These public sample credentials are for this demo only.</p>
                </details>
            </main>
        </div>
    );
}
