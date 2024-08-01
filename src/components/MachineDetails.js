import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/MachineDetails.css";
import "bootstrap/dist/css/bootstrap.min.css";

const baseURL = "http://localhost:3001";

const MachineDetails = ({ authToken }) => {
  const { machine_id } = useParams();
  const [machine, setMachine] = useState(null);
  const navigate = useNavigate();

  console.log("Machine ID:", machine_id);

  useEffect(() => {
    const fetchMachineDetails = async () => {
      try {
        const response = await axios.get(`${baseURL}/machines/${machine_id},`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        console.log("Machine details:", response.data);
        setMachine(response.data);
      } catch (error) {
        console.error("Error fetching machine details:", error);
      }
    };

    fetchMachineDetails();
  }, [machine_id, authToken]);

  if (!machine) {
    return <div> Loading...</div>;
  }

  return (
    <div className="machine-details-container">
      <h1>Machine Details</h1>
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className="machine-details">
        <h2>{machine.machine_name}</h2>
        <p>
          <strong>Owner ID:</strong> {machine.owner_id}
        </p>
        <p>
          <strong>Details:</strong> {machine.details}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(machine.created_at).toLocaleString()}
        </p>
        <p>
          <strong>Updated At:</strong>{" "}
          {new Date(machine.updated_at).toLocaleString()}
        </p>
        <p>
          <strong>Status:</strong> {machine.actions ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
};

export default MachineDetails;
