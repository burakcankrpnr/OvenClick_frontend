import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCircle,
  FaDesktop,
  FaCalendarAlt,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import "../styles/Machines.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const baseURL = "http://localhost:3001";

const Machines = ({ authToken }) => {
  const navigate = useNavigate();
  const [machines, setMachines] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMachine, setNewMachine] = useState({
    machine_name: "",
    owner_id: "",
    details: "",
  });
  const [editMachine, setEditMachine] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get(`${baseURL}/machines`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setMachines(response.data);
      } catch (error) {
        console.error("Makineler alınırken hata:", error);
      }
    };

    fetchMachines();
  }, [authToken]);

  const handleAddMachine = async () => {
    if (
      !newMachine.machine_name.trim() ||
      !newMachine.owner_id.trim() ||
      !newMachine.details.trim()
    ) {
      alert("Makine adı, sahip ID'si ve detaylar boş bırakılamaz!");
      return;
    }

    try {
      const response = await axios.get(`${baseURL}/machines`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const existingMachines = response.data;

      const isDuplicate = existingMachines.some(
        (machine) => machine.machine_name === newMachine.machine_name
      );

      if (isDuplicate) {
        alert("Bu makine adı zaten mevcut. Lütfen farklı bir ad girin.");
        return;
      }

      await axios.post(`${baseURL}/machines`, newMachine, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setNewMachine({ machine_name: "", owner_id: "", details: "" });
      setShowAddForm(false);

      const fetchResponse = await axios.get(`${baseURL}/machines`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setMachines(fetchResponse.data);
    } catch (error) {
      console.error("Makine eklenirken hata:", error);
      alert("Makine eklenirken bir hata oluştu.");
    }
  };

  const handleUpdateMachine = async () => {
    if (editMachine) {
      try {
        await axios.put(
          `${baseURL}/machines/${editMachine.machine_id}`,
          editMachine,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );

        setEditMachine(null);
        setShowEditForm(false);

        const fetchResponse = await axios.get(`${baseURL}/machines`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setMachines(fetchResponse.data);
      } catch (error) {
        console.error("Makine güncellenirken hata:", error);
        alert("Makine güncellenirken bir hata oluştu.");
      }
    }
  };

  const handleDeleteMachine = async (machine_id, e) => {
    e.stopPropagation();
    try {
      await axios.delete(`${baseURL}/machines/${machine_id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setMachines(
        machines.filter((machine) => machine.machine_id !== machine_id)
      );
    } catch (error) {
      console.error("Makine silinirken hata:", error);
      alert("Makine silinirken bir hata oluştu.");
    }
  };

  return (
    <div className="container-fluid">
      <h1>Machines</h1>
      <div className="d-flex justify-content-between mb-4">
        <button
          className="machine-add button"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <FaPlus /> {showAddForm ? "Cancel" : "Add Machine"}
        </button>
      </div>

      {showAddForm && (
        <div className="add-machine-form">
          <h2>Add New Machine</h2>
          <input
            type="text"
            placeholder="Machine Name"
            value={newMachine.machine_name}
            onChange={(e) =>
              setNewMachine({ ...newMachine, machine_name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Owner ID"
            value={newMachine.owner_id}
            onChange={(e) =>
              setNewMachine({ ...newMachine, owner_id: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Details"
            value={newMachine.details}
            onChange={(e) =>
              setNewMachine({ ...newMachine, details: e.target.value })
            }
          />
          <button className="btn btn-primary" onClick={handleAddMachine}>
            Add
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setShowAddForm(false)}
          >
            Cancel
          </button>
        </div>
      )}
      {showEditForm && editMachine && (
        <div className="edit-machine-form">
          <h2>Update Machine</h2>
          <input
            type="text"
            placeholder="Machine Name"
            value={editMachine.machine_name}
            onChange={(e) =>
              setEditMachine({ ...editMachine, machine_name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Owner ID"
            value={editMachine.owner_id}
            onChange={(e) =>
              setEditMachine({ ...editMachine, owner_id: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Details"
            value={editMachine.details}
            onChange={(e) =>
              setEditMachine({ ...editMachine, details: e.target.value })
            }
          />
          <button className="btn btn-primary" onClick={handleUpdateMachine}>
            Update
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setShowEditForm(false)}
          >
            Cancel
          </button>
        </div>
      )}

      <div className="row">
        {machines.map((machine) => (
          <div
            className="col-lg-3 col-md-4 col-sm-6 mb-4"
            key={machine.machine_id}
          >
            <div
              className="card machine-card"
              onClick={() => {
                navigate("/machines/" + machine.machine_id);
              }}
            >
              <div className="card-body">
                <h5 className="card-title">
                  {machine.machine_name} <FaDesktop className="ml-2" />
                </h5>
                <p className="card-text">
                  <FaCalendarAlt className="mr-2" />
                  Created Date: {new Date(machine.created_at).toLocaleString()}
                </p>
                <p className="card-text">
                  <FaCalendarAlt className="mr-2" />
                  Updated Date: {new Date(machine.updated_at).toLocaleString()}
                </p>

                <div className="machine-actions">
                  <div className="status">
                    <p className="card-text status-text">
                      <FaCircle
                        className={`mr-2 ${
                          machine.actions ? "text-success" : "text-danger"
                        }`}
                      />
                      {machine.actions ? "Online" : "Offline"}
                    </p>
                  </div>

                  <div className="buttons">
                    <button
                      className="action-button edit-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditMachine(machine);
                        setShowEditForm(true);
                      }}
                      aria-label={`Edit ${machine.machine_name}`}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="action-button delete-button"
                      onClick={(e) =>
                        handleDeleteMachine(machine.machine_id, e)
                      }
                      aria-label={`Delete ${machine.machine_name}`}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Machines;
