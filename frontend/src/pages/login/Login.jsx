import React, { useEffect, useState } from 'react'
import styles from "./styles.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from '../../components/header';

const Login = () => {
    // to route to desired page
    const navigate = useNavigate(null);

    // localstorage holds user id token
    const [token, setToken] = useState(window.localStorage.getItem("token") || "");
    useEffect(() => {
        if (token.length > 0) {
            navigate("/search");
        }
    }, [token]);

    // login form inputs
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });
    const [response, setResponse] = useState("");
    const handleChange = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
    };

    // login user function for validation and api call
    const loginUser = (email, password) => {
        const data = {
            email,
            password
        };
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            alert("invalid email");
            return;
        }
        if (data.password.trim().length < 8) {
            alert("password length minimum 8 required");
            return;
        }
        if (data.password.trim().length > 16) {
            alert("password length maximum 16 required");
            return;
        }
        const reg = /^[a-zA-Z0-9]+$/;
        var re = reg.test(data.password);
        if (!re) {
            alert("only alphanumeric password accepted");
            return;
        }
        const url = `http://localhost:1198/api/login`;
        document.querySelector(".submit").disabled = true;
        setResponse("");
        axios.post(url, data).then(response => {
            console.log(response);
            const token = response.data.token;
            setResponse(token);

            window.localStorage.clear();
            window.localStorage.setItem("token", token);
            navigate("/search");
        }).catch(error => {
            console.log(error);
            setResponse("Error: " + error.response.data.message);
        }).finally(() => {
            document.querySelector(".submit").disabled = false;
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const email = event.target.email.value.trim();
        const password = event.target.password.value.trim();
        loginUser(email, password);
    };

    return (
        <div className={styles.container}>
            <Header />
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.loginSection}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" className={styles.input} placeholder="Enter your email" onChange={handleChange} value={inputs.email} required />
                </div>
                <div className={styles.loginSection}>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" className={styles.input} placeholder="Enter your password" onChange={handleChange} value={inputs.password} required />
                </div>
                <div className={styles.loginSection}>
                    <input type="submit" value="Login" className={`${styles.submit} submit`} />
                    <b className={styles.response}>{response}</b>
                </div>
            </form>
        </div>
    )
}

export default Login

