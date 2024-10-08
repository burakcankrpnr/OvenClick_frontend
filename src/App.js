import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoutes";
import Machines from "./components/Machines";
import MachineDetails from "./components/MachineDetails";
import Users from "./components/Users";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/Searchbar";
import Maps from "./components/Maps";
import Logs from "./components/Logs";
import Settings from "./components/Settings";
import "./App.css";

const Layout = ({ children }) => {
  const location = useLocation();
  const showSidebar = !["/login", "/register"].includes(location.pathname);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {showSidebar && (
        <Sidebar
          onLogout={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user_id"); // user_id'yi de temizle
          }}
        />
      )}
      <div
        style={{
          marginLeft: showSidebar ? "195px" : "0px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
          {showSidebar && <SearchBar />}
        </div>
        <div style={{ flex: 1, padding: "0px", overflowY: "auto" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userId, setUserId] = useState(localStorage.getItem("user_id") || "");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("user_id");

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/machines"
          element={
            <ProtectedRoute token={token}>
              <Layout>
                <Machines authToken={token} />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/machines/:machine_id"
          element={
            <ProtectedRoute token={token}>
              <Layout>
                <MachineDetails authToken={token} />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute token={token}>
              <Layout>
                <Users token={token} />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/maps"
          element={
            <ProtectedRoute token={token}>
              <Layout>
                <Maps />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/logs"
          element={
            <ProtectedRoute token={token}>
              <Layout>
                <Logs />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute token={token}>
              <Layout>
                <Settings user_id={userId} /> {/* userId'yi Settings bileşenine geçin */}
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/machines" />} />
      </Routes>
    </Router>
  );
}

export default App;
