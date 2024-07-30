// app.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoutes";
import Machines from "./components/Machines";
import Users from "./components/Users";
import Sidebar from "./components/Sidebar";
import "./App.css";

const Layout = ({ children }) => {
  const location = useLocation();
  const showSidebar = !["/login"].includes(location.pathname);

  return (
    <div style={{ display: "flex" }}>
      {showSidebar && <Sidebar />}
      <div
        style={{
          marginLeft: showSidebar ? "250px" : "0",
          padding: "20px",
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
};

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute token={token}>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/machines"
          element={
            <ProtectedRoute token={token}>
              <Layout>
                <Machines />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute token={token}>
              <Layout>
                <Users />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
