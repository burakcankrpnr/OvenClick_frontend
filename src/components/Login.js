import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { FaKey } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import "../components/Machines";

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
        // Burada yönlendirme yapıyoruz
        navigate("/machines");
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

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-item">
          <span className="login-label">
            <AiOutlineUser /> Kullanıcı Adı
          </span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            required
          />
        </div>
        <div className="login-item">
          <span>
            <FaKey /> Şifre
          </span>
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
        <button
          type="button"
          className="register-button"
          onClick={handleRegister}
        >
          Kayıt Ol
        </button>
      </form>
    </div>
  );
}

export default Login;
