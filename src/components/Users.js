import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import "../styles/Users.css";
import "bootstrap/dist/css/bootstrap.min.css";

const baseURL = "http://localhost:3001";

const Users = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "",
    email: "",
  });
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseURL}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error(
          "Kullanıcılar alınırken hata:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchUsers();
  }, [token]);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${baseURL}/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user.user_id !== userId));
    } catch (error) {
      console.error(
        "Kullanıcı silinirken hata:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return password.length >= minLength && specialCharRegex.test(password);
  };

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/; // Only allows letters, numbers, and underscores
    return usernameRegex.test(username);
  };

  const handleAddUser = async () => {
    if (!validateUsername(newUser.username)) {
      alert(
        "Kullanıcı adı sadece harfler, rakamlar ve alt çizgi (_) içerebilir."
      );
      return;
    }

    if (!validateEmail(newUser.email)) {
      alert("Geçerli bir e-posta adresi girin.");
      return;
    }

    if (!validatePassword(newUser.password)) {
      alert(
        "Şifre en az 8 karakter uzunluğunda olmalı ve en az 1 özel karakter içermelidir."
      );
      return;
    }

    if (
      !newUser.username ||
      !newUser.password ||
      !newUser.role ||
      !newUser.email
    ) {
      alert("Kullanıcı adı, şifre, rol ve email boş bırakılamaz!");
      return;
    }

    try {
      await axios.post(`${baseURL}/user`, newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewUser({ username: "", password: "", role: "", email: "" });
      setShowAddUserForm(false);
      const response = await axios.get(`${baseURL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
      setErrorMessage(""); // Hata mesajını temizle
    } catch (error) {
      console.error(
        "Kullanıcı eklenirken hata:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleEditUser = async () => {
    if (editUser) {
      if (
        !editUser.username ||
        !editUser.password ||
        !editUser.role ||
        !editUser.email
      ) {
        alert("Kullanıcı adı, şifre, rol ve email boş bırakılamaz!");
        return;
      }

      if (!validateUsername(editUser.username)) {
        alert(
          "Kullanıcı adı sadece harfler, rakamlar ve alt çizgi (_) içerebilir."
        );
        return;
      }

      if (!validateEmail(editUser.email)) {
        alert("Geçerli bir e-posta adresi girin.");
        return;
      }

      if (!validatePassword(editUser.password)) {
        alert(
          "Şifre en az 8 karakter uzunluğunda olmalı ve en az 1 özel karakter içermelidir."
        );
        return;
      }

      try {
        await axios.put(`${baseURL}/user/${editUser.user_id}`, editUser, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditUser(null);
        setShowEditForm(false);
        const response = await axios.get(`${baseURL}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
        setErrorMessage("");
      } catch (error) {
        console.error(
          "Kullanıcı güncellenirken hata:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  const handleEditButtonClick = (user) => {
    setEditUser({
      ...user,
      password: "", // Şifreyi boş bırakıyoruz ki kullanıcı yeni bir şifre girebilsin
    });
    setShowEditForm(true);
  };

  return (
    <div className="users-container">
      <h1>Users</h1>
      <button
        className="add-user-button"
        onClick={() => setShowAddUserForm(!showAddUserForm)}
      >
        <FaPlus /> {showAddUserForm ? "Cancel" : "Add User"}
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {showAddUserForm && (
        <div className="add-user-form-container">
          <h2>Add New User</h2>
          <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Official">Official</option>
            <option value="Intern">Intern</option>
            <option value="Manager">Manager</option>
            <option value="Worker">Worker</option>
          </select>
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <button className="add-button" onClick={handleAddUser}>
            Add
          </button>
          <button
            className="cancel-button"
            onClick={() => setShowAddUserForm(false)}
          >
            Cancel
          </button>
        </div>
      )}
      {showEditForm && editUser && (
        <div className="edit-user-form-container">
          <h2>Edit User</h2>
          <input
            type="text"
            placeholder="Username"
            value={editUser.username}
            onChange={(e) =>
              setEditUser({ ...editUser, username: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={editUser.password}
            onChange={(e) =>
              setEditUser({ ...editUser, password: e.target.value })
            }
          />
          <select
            value={editUser.role}
            onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Official">Official</option>
            <option value="Intern">Intern</option>
            <option value="Manager">Manager</option>
            <option value="Worker">Worker</option>
          </select>
          <input
            type="email"
            placeholder="Email"
            value={editUser.email}
            onChange={(e) =>
              setEditUser({ ...editUser, email: e.target.value })
            }
          />
          <button className="update-button" onClick={handleEditUser}>
            Update
          </button>
          <button
            className="cancel-button"
            onClick={() => setShowEditForm(false)}
          >
            Cancel
          </button>
        </div>
      )}
      <table className="users-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>Role</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.role}</td>
              <td>{user.email}</td>
              <td>{new Date(user.created_at).toLocaleString()}</td>
              <td>{new Date(user.updated_at).toLocaleString()}</td>
              <td className="action-buttons">
                <button
                  className="edit-button"
                  onClick={() => handleEditButtonClick(user)}
                >
                  <FaEdit />
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(user.user_id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
