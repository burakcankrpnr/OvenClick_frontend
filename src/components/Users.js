import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = ({ token }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Kullanıcılar alınırken hata:", error);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div>
      <h1>Kullanıcılar</h1>
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
