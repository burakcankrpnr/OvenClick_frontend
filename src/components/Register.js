import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/auth/register",
        newUser
      );
      if (response.status === 201) {
        alert("Kayıt başarılı! Machine sayfasına yönlendiriliyorsunuz.");
        navigate("/machines");
      } else {
        console.error("Kayıt hatası:", response.data);
        alert("Kayıt sırasında bir hata oluştu.");
      }
    } catch (error) {
      console.error(
        "Kayıt hatası:",
        error.response ? error.response.data : error.message
      );
      alert("Kayıt sırasında bir hata oluştu.");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <div className="register-item">
          <span className="register-label">
            <AiOutlineUser /> Kullanıcı Adı
          </span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="register-input"
            required
          />
        </div>
        <div className="register-item">
          <span className="register-label">
            <FaEnvelope /> E-posta
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-input"
            required
          />
        </div>
        <div className="register-item">
          <span className="register-label">
            <FaKey /> Şifre
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
            required
          />
        </div>
        <button type="submit" className="register-button">
          Kayıt Ol
        </button>
      </form>
    </div>
  );
}

export default Register;
