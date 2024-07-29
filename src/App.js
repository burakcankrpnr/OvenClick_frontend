import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoutes";
import Machines from "./components/Machines";

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
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/machines"
          element={
            <ProtectedRoute token={token}>
              <Machines />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
