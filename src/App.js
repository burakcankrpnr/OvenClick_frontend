import React, { useState } from "react";
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
        <div style={{ display: "flow", alignItems: "center", padding: "10px" }}>
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
        <Route path="/" element={<Navigate to="/machines" />} />
      </Routes>
    </Router>
  );
}

export default App;
