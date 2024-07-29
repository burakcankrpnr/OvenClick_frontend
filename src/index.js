import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";
import { AuthProvider } from "./components/AuthContext";

axios.defaults.baseURL = "http://localhost:3001/api";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
