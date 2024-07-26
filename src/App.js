import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Machines from "./components/Machines";
import Users from "./components/Users";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/home"
          element={<ProtectedRoute element={<Home />} token={token} />}
        />
        <Route
          path="/machines"
          element={
            <ProtectedRoute
              element={<Machines token={token} />}
              token={token}
            />
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute element={<Users token={token} />} token={token} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
