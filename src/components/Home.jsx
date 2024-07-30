import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Sidebar from "./Sidebar";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="home-container">
      <Sidebar onLogout={handleLogout} />
      <div className="home-content">
      </div>
    </div>
  );
};

export default Home;
