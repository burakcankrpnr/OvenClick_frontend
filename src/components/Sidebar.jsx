// components/Sidebar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaList, FaSignOutAlt, FaUser } from "react-icons/fa";
import "../styles/Sidebar.css"; // Stil dosyasını import edelim

const Sidebar = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}
      onMouseEnter={() => setIsSidebarOpen(true)}
      onMouseLeave={() => setIsSidebarOpen(false)}
    >
      <ul className="menu">
        <li>
          <Link to="/home" className="link">
            <FaHome className="icon" /> Home
          </Link>
        </li>
        <li>
          <Link to="/machines" className="link">
            <FaList className="icon" /> Machines
          </Link>
        </li>
        <li>
          <Link to="/users" className="link">
            <FaUser className="icon" /> Users
          </Link>
        </li>
        <li>
          <button className="logout-button" onClick={onLogout}>
            <FaSignOutAlt className="icon" /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
