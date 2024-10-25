import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import SearchBar from "../src/components/Searchbar";

const Layout = ({ onLogout }) => {
  return (
    <div className="layout">
      <Sidebar onLogout={onLogout} />
      <div className="main-content">
        <SearchBar />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
