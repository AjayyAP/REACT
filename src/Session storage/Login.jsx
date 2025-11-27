import React, { useState, useEffect } from "react";
import "./Login.css";

export default function Login() {
    const [page, setPage] = useState("signup");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem("loggedIn");
        if (isLoggedIn) {
            setPage("dashboard");
        }
    }, []);

    const handleSignup = () => {
        if (!username.trim() || !password.trim()) {
            setMessage("All fields are required.");
            return;
        }
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("password", password);
        setMessage("Signup successful! You can now login.");
        setUsername("");
        setPassword("");
    };

    const handleLogin = () => {
        const storedUser = sessionStorage.getItem("username");
        const storedPass = sessionStorage.getItem("password");

        if (username === storedUser && password === storedPass) {
            sessionStorage.setItem("loggedIn", "true");
            setPage("dashboard");
            setMessage("");
        } else {
            setMessage("Invalid username or password");
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("loggedIn");
        setPage("login");
        setUsername("");
        setPassword("");
        setMessage("");
    };

    return (
        <div className="app-page">

            {page === "signup" && (
                <div className="card">
                    <h2 className="title">Signup</h2>
                    {message && <p className="message">{message}</p>}

                    <input
                        type="text"
                        className="input"
                        placeholder="Choose a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        className="input"
                        placeholder="Choose a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="btn signup-btn" onClick={handleSignup}>
                        Create Account
                    </button>

                    <p className="switch-text">
                        Already have an account?{" "}
                        <span
                            onClick={() => {
                                setPage("login");
                                setMessage("");
                            }}
                            className="switch-link"
                        >
                            Login
                        </span>
                    </p>
                </div>
            )}

            {page === "login" && (
                <div className="card">
                    <h2 className="title">Login</h2>
                    {message && <p className="message error">{message}</p>}

                    <input
                        type="text"
                        className="input"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        className="input"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="btn login-btn" onClick={handleLogin}>
                        Login
                    </button>

                    <p className="switch-text">
                        Don't have an account?{" "}
                        <span
                            onClick={() => {
                                setPage("signup");
                                setMessage("");
                            }}
                            className="switch-link"
                        >
                            Signup
                        </span>
                    </p>
                </div>
            )}

            {page === "dashboard" && (
                <div className="card">
                    <h1>Welcome to Dashboard</h1>
                    <p>You are successfully logged in.</p>

                    <button className="btn logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
