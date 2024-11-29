import React, { useEffect, useState } from 'react';
import {  FaEnvelope, FaUserAlt, FaIdBadge, FaUserShield,  } from 'react-icons/fa';
import '../styles/Settings.css';

const Settings = ({ user_id }) => {
  const [user, setUser] = useState(null);

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
        {/* <FaUser className="icon"  />   */}
          <h2>{user.username} 
          </h2>
          {user.role}

        </div>
        <div className="profile-body">
          <div className="profile-info">
            <div className="info-item">
            <p>
            <FaEnvelope className="icon" /><strong>Email:</strong> {user.email} </p>
            </div>
            <div className="info-item">
              <FaUserAlt className="icon" />
              <p><strong>Name:</strong> {user.username}</p>
            </div>
            <div className="info-item">
              <FaIdBadge className="icon" />
              <p><strong>ID:</strong> {user.user_id}</p>
            </div>
            <div className="info-item">
              <FaUserShield className="icon" />
              <p><strong>Role:</strong> {user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
