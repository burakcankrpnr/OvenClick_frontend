import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { 
  FaUser, 
  FaIdCard, 
  FaInfoCircle, 
  FaCalendarAlt, 
  FaSyncAlt, 
  FaCircle, 
  FaArrowLeft, 
  FaSave,
  FaMapMarkerAlt
} from 'react-icons/fa';
import "../styles/MachineDetails.css";
import "bootstrap/dist/css/bootstrap.min.css";

const baseURL = "http://localhost:3001";

const MachineDetails = ({ authToken }) => {
  const { machine_id } = useParams();
  const [machine, setMachine] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMachineDetails = async () => {
      try {
        const response = await axios.get(`${baseURL}/machines/${machine_id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setMachine(response.data);
        setLatitude(response.data.latitude || "");
        setLongitude(response.data.longitude || "");
      } catch (error) {
        console.error("Error fetching machine details:", error);
      }
    };

    fetchMachineDetails();
  }, [machine_id, authToken]);

  const handleSaveCoordinates = async () => {
    try {
      await axios.put(
        `${baseURL}/machines/${machine_id}`,
        { latitude, longitude },  // JSON formatında veri gönderin
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      alert("Coordinates updated successfully.");
      setIsEditing(false); 
    } catch (error) {
      console.error("Error updating coordinates:", error.response ? error.response.data : error.message);
      alert("Error updating coordinates.");
    }
  };

  if (!machine) {
    return <div>Loading...</div>;
  }

  return (
    <div className="machine-details-container">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Go Back
      </button>
      <h1>{machine.machine_name}</h1>
      <div className="machine-details">
        <div className="card">
          <h2><FaUser /> Owner ID</h2>
          <p>{machine.owner_id}</p>
        </div>
        <div className="card">
          <h2><FaIdCard /> Machine ID</h2>
          <p>{machine.machine_id}</p>
        </div>
        <div className="card">
          <h2><FaInfoCircle /> Details</h2>
          <p>{machine.details}</p>
        </div>
        <div className="card">
          <h2><FaCircle /> Status</h2>
          <p className={machine.actions ? "text-success" : "text-danger"}>
            {machine.actions ? (
              <>
                <FaCircle /> Online
              </>
            ) : (
              <>
                <FaCircle /> Offline
              </>
            )}
          </p>
        </div>
        <div className="card">
          <h2><FaCalendarAlt /> Created At</h2>
          <p>{new Date(machine.created_at).toLocaleString()}</p>
        </div>
        <div className="card">
          <h2><FaSyncAlt /> Updated At</h2>
          <p>{new Date(machine.updated_at).toLocaleString()}</p>
        </div>

        <div className="card">
          <h2><FaMapMarkerAlt /> Coordinates</h2>
          {isEditing ? (
            <div>
              <input
                type="text"
                placeholder="Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
              <input
                type="text"
                placeholder="Longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
              <button className="btn btn-primary mt-2" onClick={handleSaveCoordinates}>
                <FaSave /> Save
              </button>
              <button className="btn btn-secondary mt-2 ml-2" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <p><strong>Latitude:</strong> {latitude}</p>
              <p><strong>Longitude:</strong> {longitude}</p>
              <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                Edit Coordinates
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MachineDetails;
