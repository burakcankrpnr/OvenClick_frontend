import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCircle,
  FaDesktop,
  FaCalendarAlt,
  FaInfoCircle,
} from "react-icons/fa";
import "../styles/Machines.css";
import "bootstrap/dist/css/bootstrap.min.css";
const baseURL = "http://localhost:3001";

const Machines = ({ token }) => {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get(baseURL + "/machines", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Makineler:", response);
        setMachines(response.data);
      } catch (error) {
        console.error("Makineler alınırken hata:", error);
      }
    };

    fetchMachines();
  }, [token]);

  return (
    <div className="container-fluid">
      <div className="row">
        {machines.map((machine) => (
          <div
            className="col-lg-3 col-md-4 col-sm-6 mb-4"
            key={machine.machine_id}
          >
            <div className="card machine-card">
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
                {/* <p className="card-text">
                  <FaInfoCircle className="mr-2" />
                  Details
                </p> */}
                <p className="card-text status-text">
                  <FaCircle
                    className={`mr-2 ${
                      machine.actions ? "text-success" : "text-danger"
                    }`}
                  />
                  {machine.actions ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Machines;
