import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Settings.css';

const Settings = ({ user_id }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  

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
