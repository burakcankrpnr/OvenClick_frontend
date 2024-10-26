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
// import SearchBar from "./components/Searchbar"; 
import Maps from "./components/Maps";
import Logs from "./components/Logs";
import Settings from "./components/Settings";
import "./App.css";

const Layout = ({ children, searchResults, onSearch }) => {
  const location = useLocation();
  const showSidebar = !["/login", "/register"].includes(location.pathname);

  return (
    <div style={{ display: "flex", height: "100vh , background-color: #000000" }}>
      {showSidebar && (
        <Sidebar
          onLogout={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("UserId"); 
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
          {/* {showSidebar && <SearchBar onSearch={onSearch} />} SearchBar'a onSearch propunu geçiyoruz */}
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
  const [UserId, setUserId] = useState(localStorage.getItem("user_id") || "");
  const [searchResults, setSearchResults] = useState([]);

   useEffect(() => {
 const storedToken = localStorage.getItem("token");
 const storedUserId = localStorage.getItem("UserId");

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleSearch = (query) => {
    // Arama yapılacak veriler
    const data = [
      { id: 1, title: 'Machine 1' },
      { id: 2, title: 'User 1' },
      { id: 3, title: 'Log Entry 1' },
      { id: 4, title: 'Machine 2' },
      { id: 5, title: 'User 2' },
      { id: 6, title: 'Log Entry 2' },
      // Diğer veriler...
    ];

    // Arama sonuçlarını filtreleme
    const results = data.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/machines"
          element={
            <ProtectedRoute token={token}>
              <Layout onSearch={handleSearch}>
                <Machines authToken={token} searchResults={searchResults} />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/machines/:machine_id"
          element={
            <ProtectedRoute token={token}>
              <Layout onSearch={handleSearch}>
                <MachineDetails authToken={token} />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute token={token}>
              <Layout onSearch={handleSearch}>
                <Users token={token} />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/maps"
          element={
            <ProtectedRoute token={token}>
              <Layout onSearch={handleSearch}>
                <Maps />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/logs"
          element={
            <ProtectedRoute token={token}>
              <Layout onSearch={handleSearch}>
                <Logs />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute token={token}>
              <Layout onSearch={handleSearch}>
                <Settings user_id={UserId} /> {/* userId'yi Settings bileşenine geçin */}
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
