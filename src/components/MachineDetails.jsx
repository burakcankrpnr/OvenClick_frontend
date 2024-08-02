import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaUser, FaIdCard, FaInfoCircle, FaCalendarAlt, FaSyncAlt, FaCircle, FaArrowLeft } from 'react-icons/fa';
import "../styles/MachineDetails.css";
import "bootstrap/dist/css/bootstrap.min.css";

const baseURL = "http://localhost:3001";

const MachineDetails = ({ authToken }) => {
  const { machine_id } = useParams();
  const [machine, setMachine] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMachineDetails = async () => {
      try {
        const response = await axios.get(`${baseURL}/machines/${machine_id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setMachine(response.data);
      } catch (error) {
        console.error("Error fetching machine details:", error);
      }
    };

    fetchMachineDetails();
  }, [machine_id, authToken]);

  if (!machine) {
    return <div>Loading...</div>;
  }

  return (
    <div className="machine-details-container">
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>
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
          <h2><FaCalendarAlt /> Created At</h2>
          <p>{new Date(machine.created_at).toLocaleString()}</p>
        </div>
        <div className="card">
          <h2><FaSyncAlt /> Updated At</h2>
          <p>{new Date(machine.updated_at).toLocaleString()}</p>
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
      </div>
    </div>
  );
};

export default MachineDetails;
