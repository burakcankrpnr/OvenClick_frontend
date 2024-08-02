import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaUser,
  FaEnvelope,
  FaIdBadge,
  FaCalendarDay,
  FaLock,
} from "react-icons/fa";
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
          "Error fetching users:",
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
        "Error deleting user:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleAddUser = async () => {
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
      setErrorMessage("");
    } catch (error) {
      console.error(
        "Error adding user:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleEditUser = async () => {
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
        "Error updating user:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleEditButtonClick = (user) => {
    setEditUser({
      ...user,
      password: "",
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
          <div className="form-group">
            <label htmlFor="new-username">Username</label>
            <input
              id="new-username"
              type="text"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-password">Password</label>
            <input
              id="new-password"
              type="password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-email">Email</label>
            <input
              id="new-email"
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-role">Role</label>
            <select
              id="new-role"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              required
            >
              <option value="">Select a role</option>
              <option value="Admin">Admin</option>
              <option value="Owner">Owner</option>
              <option value="User">User</option>
            </select>
          </div>
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
          <div className="form-group">
            <label htmlFor="edit-username">Username</label>
            <input
              id="edit-username"
              type="text"
              value={editUser.username}
              onChange={(e) =>
                setEditUser({ ...editUser, username: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-password">Password</label>
            <input
              id="edit-password"
              type="password"
              value={editUser.password}
              onChange={(e) =>
                setEditUser({ ...editUser, password: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-email">Email</label>
            <input
              id="edit-email"
              type="email"
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-role">Role</label>
            <select
              id="edit-role"
              value={editUser.role}
              onChange={(e) =>
                setEditUser({ ...editUser, role: e.target.value })
              }
              required
            >
              <option value="">Select a role</option>
              <option value="Admin">Admin</option>
              <option value="Owner">Owner</option>
              <option value="User">User</option>
            </select>
          </div>
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
      <div className="users-grid">
        {users.map((user) => (
          <div className="user-card" key={user.user_id}>
            <h3>{user.username}</h3>
            <div className="user-info">
              <div className="info-item">
                <FaIdBadge className="info-icon" />
                <p>
                  <strong>ID:</strong> {user.user_id}
                </p>
              </div>
              <div className="info-item">
                <FaUser className="info-icon" />
                <p>
                  <strong>Role:</strong> {user.role}
                </p>
              </div>
              <div className="info-item">
                <FaEnvelope className="info-icon" />
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
              </div>
              <div className="info-item">
                <FaCalendarDay className="info-icon" />
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(user.created_at).toLocaleString()}
                </p>
              </div>
              <div className="info-item">
                <FaCalendarDay className="info-icon" />
                <p>
                  <strong>Update At:</strong>{" "}
                  {new Date(user.updated_at).toLocaleString()}
                </p>
              </div>
              <div className="info-item">
                <FaLock className="info-icon" /> {/* Şifre için ikon */}
                <p>
                  <strong>Password:</strong> {user.password}
                </p>{" "}
                {/* Şifre gösteriliyor */}
              </div>
            </div>
            <div className="card-actions">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
