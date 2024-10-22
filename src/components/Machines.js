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
import ConfirmationModal from "./ConfirmationModal";

const baseURL = "http://localhost:3001";

const Machines = ({ authToken }) => {
  const navigate = useNavigate();
  const [machines, setMachines] = useState([]);
  const [filteredMachines, setFilteredMachines] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMachine, setNewMachine] = useState({
    machine_name: "",
    owner_id: "",
    details: "",
  });
  const [editMachine, setEditMachine] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Sayfada gösterilecek makine sayısı

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get(`${baseURL}/machines`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setMachines(response.data);
        setFilteredMachines(response.data);
      } catch (error) {
        console.error("Makineler alınırken hata:", error);
      }
    };

    fetchMachines();
  }, [authToken]);

  useEffect(() => {
    const results = machines.filter(machine =>
      machine.machine_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMachines(results);
  }, [searchTerm, machines]);

  const handleAddMachine = async () => {
    if (!newMachine.machine_name.trim() || !newMachine.owner_id.trim() || !newMachine.details.trim()) {
      alert("Makine adı, sahip ID'si ve detaylar boş bırakılamaz!");
      return;
    }

    try {
      const isDuplicate = machines.some(
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
      const response = await axios.get(`${baseURL}/machines`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setMachines(response.data);
    } catch (error) {
      console.error("Makine eklenirken hata:", error);
      alert("Makine eklenirken bir hata oluştu.");
    }
    alert("Makine başarıyla eklendi.");
  };

  const handleUpdateMachine = () => {
    if (editMachine) {
      setConfirmAction(() => async () => {
        try {
          await axios.put(`${baseURL}/machines/${editMachine.machine_id}`, editMachine, {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          setEditMachine(null);
          setShowEditForm(false);
          const response = await axios.get(`${baseURL}/machines`, {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          setMachines(response.data);
          alert("Makine başarıyla güncellendi.");
        } catch (error) {
          console.error("Makine güncellenirken hata:", error);
          alert("Makine güncellenirken bir hata oluştu.");
        }
      });
      setConfirmMessage("Bu makinenin güncellenmesini onaylıyor musunuz?");
      setShowConfirmModal(true);
    }
  };

  const handleDeleteMachine = (machine_id) => {
    setConfirmAction(() => async () => {
      try {
        await axios.delete(`${baseURL}/machines/${machine_id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setMachines(machines.filter((machine) => machine.machine_id !== machine_id));
        setShowConfirmModal(false);
        alert("Makine başarıyla silindi.");
      } catch (error) {
        console.error("Makine silinirken hata:", error);
        alert("Makine silinirken bir hata oluştu.");
      }
    });
    setConfirmMessage("Bu makineyi silmek istediğinize emin misiniz?");
    setShowConfirmModal(true);
  };

  const handleAddMachineClick = () => {
    setConfirmAction(() => handleAddMachine);
    setConfirmMessage("Yeni makineyi eklemek istediğinize emin misiniz?");
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    if (confirmAction && typeof confirmAction === 'function') {
      confirmAction();
      setConfirmAction(null); // Reset the action after confirmation
    } else {
      console.error("Confirm action is not a valid function");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Sayfayı arama sonucuna göre sıfırla
  };

  // Sayfalama fonksiyonu
  const indexOfLastMachine = currentPage * itemsPerPage;
  const indexOfFirstMachine = indexOfLastMachine - itemsPerPage;
  const currentMachines = filteredMachines.slice(indexOfFirstMachine, indexOfLastMachine);
  const totalPages = Math.ceil(filteredMachines.length / itemsPerPage);

  return (
    <div className="container-fluid">
      <h1>Machines</h1>
      <div className="d-flex justify-content-between mb-4">
        <input
          type="text"
          placeholder="Search Machines.."
          value={searchTerm}
          onChange={handleSearch}
          className="form-control"
        />
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
          <button className="btn btn-primary" onClick={handleAddMachineClick}>
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

          <button
            className="btn btn-primary"
            onClick={handleUpdateMachine}
          >
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
        {currentMachines.map((machine) => (
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
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteMachine(machine.machine_id);
                      }}
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

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? 'activ' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <ConfirmationModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={handleConfirm}
        title="Onay"
        body={confirmMessage}
      />
    </div>
  );
};

export default Machines;
