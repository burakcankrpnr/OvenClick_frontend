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
  FaUserShield,

} from "react-icons/fa";
import "../styles/Users.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap"; 

const baseURL = "http://localhost:3001";

const Users = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "",
    email: "",
  });
  const [editUser, setEditUser] = useState(null);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 12;
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

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (user_id) => {
    try {
      await axios.delete(`${baseURL}/user/${user_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user.user_id !== user_id));
    } catch (error) {
      
      console.error(
        "Error deleting user:",
        error.response ? error.response.data : error.message
      );
    }
    alert("Kullanıcı silindi");
  };


  const handleAddUser = async () => {
    const usernamePattern = /^[^_]+$/;
    if (!usernamePattern.test(newUser.username)) {
      alert("Kullanıcı adı '_' karakteri içeremez.");
      return;
    }

    if (newUser.password.length <= 8) {
      alert("Parola en az 8 karakter uzunluğunda olmalıdır.");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(newUser.email)) {
      alert("Geçerli bir e-posta adresi girin.");
      return;
    }

    try {
      await axios.post(`${baseURL}/user`, newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewUser({ username: "", password: "", role: "", email: "" });
      const response = await axios.get(`${baseURL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
      setShowAddUserForm(false); 
    } catch (error) {
      console.error(
        "Error adding user:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleEditUser = async () => {
    const usernamePattern = /^[^_]+$/;
    if (!usernamePattern.test(editUser.username)) {
      alert("Kullanıcı adı '_' karakteri içeremez.");
      return;
    }

    if (editUser.password.length > 0 && editUser.password.length <= 8) {
      alert("Parola en az 8 karakter uzunluğunda olmalıdır.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(editUser.email)) {
      alert("Geçerli bir e-posta adresi girin.");
      return;
    }

    try {
      await axios.put(`${baseURL}/user/${editUser.user_id}`, editUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditUser(null);
      const response = await axios.get(`${baseURL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error(
        "Error updating user:",
        error.response ? error.response.data : error.message
      );
    }
    alert("Kullanıcı başarıyla güncellendi.");
  };

  const handleEditButtonClick = (user) => {
    setEditUser({
      ...user,
      password: "", // Prevent showing password on edit
    });
  };

  return (
    <div className="users-container">
      <div className="d-flex justify-content-between mb-4">
        <Form.Control
          type="text"
          placeholder="Search Users by Username.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "100%" }}
        />
        <button
          className="add-user-button"
          onClick={() => setShowAddUserForm(true)} 
        >
          <FaPlus />Add User
        </button>
      </div>

      <div className="pagination-container d-flex justify-content-center mt-4">
  <ul className="pagination">
    {Array.from({ length: totalPages }, (_, index) => index + 1).map(
      (pageNumber) => (
        <li
          key={pageNumber}
          className={`page-item ${
            pageNumber === currentPage ? "active" : ""
          }`}
        >
          <button
            className={`page-link ${
              pageNumber !== currentPage ? "inactive-page" : ""
            }`} 
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        </li>
      )
    )}
  </ul>
</div>


      {/* Add User Modal */}
      <Modal show={showAddUserForm} onHide={() => setShowAddUserForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="new-username">
              <Form.Control
                type="text"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                required
                placeholder="Username"
                style={{
                  marginBottom: '15px',
                  padding: '10px',
                  fontSize: '1rem',
                }}
              />
            </Form.Group>

            <Form.Group controlId="new-password">
              <Form.Control
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                required
                placeholder="Password"
                style={{
                  marginBottom: '15px',
                  padding: '10px',
                  fontSize: '1rem',
                }}
              />
            </Form.Group>

            <Form.Group controlId="new-email">
              <Form.Control
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                required
                placeholder="Email"
                style={{
                  marginBottom: '15px',
                  padding: '10px',
                  fontSize: '1rem',
                }}
              />
            </Form.Group>

            <Form.Group controlId="new-role">
              <Form.Control
                as="select"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                required
                style={{
                  marginBottom: '15px',
                  padding: '10px',
                  fontSize: '1rem',
                }}
              >
                <option value="">Select a role</option>
                <option value="Admin">Admin</option>
                <option value="Owner">Owner</option>
                <option value="User">User</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddUserForm(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
          Add User
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit User Modal */}
      {editUser && (
        <Modal show={editUser !== null} onHide={() => setEditUser(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="edit-username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={editUser.username}
                  onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group controlId="edit-password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={editUser.password}
                  onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="edit-email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={editUser.email}
                  onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group controlId="edit-role">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  value={editUser.role}
                  onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                  required
                >
                  <option value="Admin">Admin</option>
                  <option value="Owner">Owner</option>
                  <option value="User">User</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditUser(null)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleEditUser}>
              Update User
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Users Display */}
  <div className="users-grid">
  {currentUsers.map((user) => (

          <div className="user-card" key={user.user_id}>
            <h3>{user.username} <FaUser className="ml-3 " /></h3>
            <div className="user-info">
              <div className="info-item">
                <FaIdBadge className="info-icon" />
                <p>
                  <strong>ID:</strong> {user.user_id}
                </p>
              </div>
              <div className="info-item">
                <FaUserShield className="info-icon" />
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
                  <strong>Created At:</strong> {new Date(user.created_at).toLocaleString()}
                </p>
              </div>
              <div className="info-item">
                <FaCalendarDay className="info-icon" />
                <p>
                  <strong>Update At:</strong> {new Date(user.updated_at).toLocaleString()}
                </p>
              </div>
              <div className="info-item">
                <FaLock className="info-icon" />
                <p>
                  <strong>Password:</strong> {user.password}
                </p>
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
