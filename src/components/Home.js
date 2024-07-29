import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="home-container">
      <h2 className="home-header">Home Page</h2>
      <p className="home-paragraph">Welcome to the home page!</p>
      <button className="home-button" onClick={handleLogout}>
        Çıkış Yap
      </button>
    </div>
  );
}

export default Home;
