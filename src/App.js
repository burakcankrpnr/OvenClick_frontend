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

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route element={<ProtectedRoute element={<Home />} token={token} />}>
          <Route path="/home" element={<Navigate to="/home" />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
