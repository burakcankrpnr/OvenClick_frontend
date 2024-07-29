import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // CSS dosyasını içe aktar

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        credentials
      );

      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      } else {
        console.error("Token alınamadı");
      }
    } catch (error) {
      console.error(
        "Giriş hatası:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-container">
      <div>
        <label className="login-label">Kullanıcı Adı</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
          required
        />
      </div>
      <div>
        <label className="login-label">Şifre</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          required
        />
      </div>
      <button type="submit" className="login-button">
        Giriş Yap
      </button>
    </form>
  );
}

export default Login;
