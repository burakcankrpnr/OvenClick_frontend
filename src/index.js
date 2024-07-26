import React from "react";
import ReactDOM from "react-dom/client"; // 'react-dom/client' kullanılmalı
import App from "./App";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/api";

const root = ReactDOM.createRoot(document.getElementById("root")); // createRoot ile root oluşturuluyor
root.render(<App />); // root.render kullanılıyor
