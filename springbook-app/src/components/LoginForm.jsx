import React, { useState } from "react";
import '../App.css'; // Importando o CSS global

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && password) {
            if (username === "admin" && password === "1") {
                localStorage.setItem("isAdmin", "true");
                localStorage.setItem("username", username);
                alert("Login successful!");
                window.location.href = "/lab_admin";
            } else if (username === "elton" && password === "123") {
                localStorage.setItem("isAdmin", "false");
                localStorage.setItem("username", username);
                localStorage.setItem("proId", 1);
                alert("Login successful!");
                window.location.href = "/lab_professor";
            } else if (username === "fernando" && password === "123") {
                localStorage.setItem("isAdmin", "false");
                localStorage.setItem("username", username);
                localStorage.setItem("proId", 2);
                alert("Login successful!");
                window.location.href = "/lab_professor";
            } else if (username === "everton" && password === "123") {
                localStorage.setItem("isAdmin", "false");
                localStorage.setItem("username", username);
                localStorage.setItem("proId", 3);
                alert("Login successful!");
                window.location.href = "/lab_professor";
            } else {
                alert("Invalid username or password.");
            }
        } else {
            alert("Please fill in all fields.");
        }
    };

    return (
        <div className="main-container">
            <div className="logo-container">
                <img src="images/logo-blue.png" alt="Logo" className="logo" />
            </div>
            <h2>Login</h2>
            <div className="login-icon">
                <i className="fas fa-user-circle"></i>
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        className="form-control input-field"
                        type="text"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        className="form-control input-field"
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button id="btnlogin" className="btn-primary login-button" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginForm;