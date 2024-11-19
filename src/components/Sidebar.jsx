import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaList, FaSignOutAlt, FaUser, FaCogs, FaUsers, FaMap, FaFileAlt, FaSun, FaMoon } from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);  // New state for hover effect
  const location = useLocation();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Dark mode için body sınıfını güncelle
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <div
      className={`sidebar ${isSidebarOpen ? "open" : "closed"} ${isDarkMode ? "dark" : "light"}`}
      onMouseEnter={() => setIsSidebarOpen(true)}
      onMouseLeave={() => setIsSidebarOpen(false)}
    >
      <ul className="menu">
        <li className="top-icon">
          <FaCogs className="icon" />
          <FaUsers className="icon" />
        </li>
        <li className={location.pathname === "/machines" ? "active" : ""}>
          <Link to="/machines" className="link">
            <FaList className="icon" /> Machines
          </Link>
        </li>
        <li className={location.pathname === "/users" ? "active" : ""}>
          <Link to="/users" className="link">
            <FaUsers className="icon" /> Users
          </Link>
          <Link to="/logs" className="link">
            <FaFileAlt className="icon" /> Logs
          </Link>
        </li>
        <li>
          <Link to="/maps" className="link">
            <FaMap className="icon" /> Maps
          </Link>
        </li>

        {/* Profile Section */}
        <li
          className="profile-item"
          onMouseEnter={() => setIsProfileHovered(true)}
          onMouseLeave={() => setIsProfileHovered(false)}
        >
          <Link to="/settings" className="link">
            <FaUser className="icon" /> Profile
          </Link>
          
          {/* Profile Popup */}
          {isProfileHovered && (
            <div className="profile-popup">
              <p>View Profile</p>
              <p>Settings</p>
              <p>Account</p>
            </div>
          )}
        </li>

        <li>
          <Link to="/login" className="link" onClick={onLogout}>
            <FaSignOutAlt className="icon" /> Logout
          </Link>
        </li>
      </ul>

      <div className="toggle-container">
        <FaSun className="icon-left" />
        <label className="switch">
          <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
          <span className="slider round"></span>
        </label>
        <FaMoon className="icon-right" />
      </div>
    </div>
  );
};

export default Sidebar;
