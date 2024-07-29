import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <div>
      <h1>Makineler</h1>
      <ul>
        {machines.map((machine) => (
          <li key={machine.machine_id}>{machine.machine_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Machines;
