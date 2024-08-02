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
        Go Back
      </button>
      <h1>Machine Details</h1>

      <div className="machine-details">
        <div>
          <h2>{machine.machine_name}</h2>
          <p>
            <strong>Owner ID:</strong> {machine.owner_id}
          </p>
          <p>
            <strong>Details:</strong> {machine.details}
          </p>
        </div>
        <div>
          <h2>Additional Information</h2>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(machine.created_at).toLocaleString()}
          </p>
          <p>
            <strong>Updated At:</strong>{" "}
            {new Date(machine.updated_at).toLocaleString()}
          </p>
          <p className="status-text">
            <strong>Status:</strong>{" "}
            {machine.actions ? (
              <span className="text-success">
                <i className="fa fa-circle"></i> Online
              </span>
            ) : (
              <span className="text-danger">
                <i className="fa fa-circle"></i> Offline
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MachineDetails;
