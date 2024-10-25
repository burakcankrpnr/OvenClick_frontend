import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Settings.css';

const Settings = ({ user_id }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const token = localStorage.getItem("token");
  //     console.log("Token:", token);
  //     console.log("User ID:", user_id);
      
  //     if (token && user_id) {
  //       try {
  //         const response = await axios.get(`/user/${user_id}`, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           }
  //         });
  //         setUser(response.data);
  //       } catch (error) {
  //         console.error("Kullanıcı bilgileri getirilemedi:", error);
  //       }
  //     } else {
  //       console.error("Token veya User ID bulunamadı.");
  //     }
  //     setLoading(false);
  //   };

  //   fetchUserData();
  // }, [user_id]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  if (!user) {
    return <div>Kullanıcı bilgileri bulunamadı.</div>;
  }

  return (
    <div className="settings-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2>User Profile</h2>
        </div>
        <div className="profile-body">
          <div className="profile-info">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Name:</strong> {user.username}</p>
            <p><strong>ID:</strong> {user.user_id}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
