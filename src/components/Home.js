import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // AuthContext'i içe aktar

function Home() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div>
      <h2>Home Page</h2>
      <p>Welcome to the home page!</p>
      <button onClick={handleLogout}>Çıkış Yap</button>
    </div>
  );
}

export default Home;
