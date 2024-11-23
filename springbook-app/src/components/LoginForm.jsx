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
                alert("Login bem-sucedido!");
                window.location.href = "/lab_admin";
            } else if (username === "elton" && password === "123") {
                localStorage.setItem("isAdmin", "false");
                localStorage.setItem("username", username);
                localStorage.setItem("proId", 1);
                alert("Login bem-sucedido!");
                window.location.href = "/lab_professor";
            } else if (username === "fernando" && password === "123") {
                localStorage.setItem("isAdmin", "false");
                localStorage.setItem("username", username);
                localStorage.setItem("proId", 2);
                alert("Login bem-sucedido!");
                window.location.href = "/lab_professor";
            } else if (username === "everton" && password === "123") {
                localStorage.setItem("isAdmin", "false");
                localStorage.setItem("username", username);
                localStorage.setItem("proId", 3);
                alert("Login bem-sucedido!");
                window.location.href = "/lab_professor";
            } else {
                alert("Nome de usuário ou senha inválidos.");
            }
        } else {
            alert("Por favor, preencha todos os campos.");
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
                    <label htmlFor="username">Nome de Usuário</label>
                    <input
                        className="form-control input-field"
                        type="text"
                        id="username"
                        placeholder="Usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Senha</label>
                    <input
                        className="form-control input-field"
                        type="password"
                        id="password"
                        placeholder="Senha"
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