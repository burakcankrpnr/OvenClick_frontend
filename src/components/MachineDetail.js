import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaCircle, FaCalendarAlt, FaDesktop } from "react-icons/fa";
import "../styles/MachineDetail.css"; // Add your CSS styling here

const baseURL = "http://localhost:3001";

const MachineDetail = ({ authToken }) => {
  const { machineId } = useParams(); // Get the machine ID from the URL
  const [machine, setMachine] = useState(null);

  useEffect(() => {
    const fetchMachine = async () => {
      try {
        const response = await axios.get(`${baseURL}/machines/${machineId}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setMachine(response.data);
      } catch (error) {
        console.error("Makine detayları alınırken hata:", error);
      }
    };

    fetchMachine();
  }, [machineId, authToken]);

  if (!machine) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>{machine.machine_name}</h1>
      <div className="machine-detail">
        <p>
          <FaDesktop /> Machine Name: {machine.machine_name}
        </p>
        <p>
          <FaCalendarAlt /> Created Date:{" "}
          {new Date(machine.created_at).toLocaleString()}
        </p>
        <p>
          <FaCalendarAlt /> Updated Date:{" "}
          {new Date(machine.updated_at).toLocaleString()}
        </p>
        <p>
          <FaCircle
            className={`mr-2 ${
              machine.actions ? "text-success" : "text-danger"
            }`}
          />
          {machine.actions ? "Online" : "Offline"}
        </p>
        <p>Owner ID: {machine.owner_id}</p>
        <p>Details: {machine.details}</p>
      </div>
    </div>
  );
};

export default MachineDetail;
