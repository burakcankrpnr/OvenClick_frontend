import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaList, FaSignOutAlt, FaUser } from "react-icons/fa";
import "../styles/Sidebar.css"; 

const Sidebar = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div
      className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}
      onMouseEnter={() => setIsSidebarOpen(true)}
      onMouseLeave={() => setIsSidebarOpen(false)}
    >
      <ul className="menu">
        <li className={location.pathname === "/home" ? "active" : ""}>
          <Link to="/home" className="link">
            <FaHome className="icon" /> Home
          </Link>
        </li>
        <li className={location.pathname === "/machines" ? "active" : ""}>
          <Link to="/machines" className="link">
            <FaList className="icon" /> Machines
          </Link>
        </li>
        <li className={location.pathname === "/users" ? "active" : ""}>
          <Link to="/users" className="link">
            <FaUser className="icon" /> Users
          </Link>
        </li>
        <li>
          <Link to="/login" className="link" onClick={onLogout}>
            <FaSignOutAlt className="icon" /> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

