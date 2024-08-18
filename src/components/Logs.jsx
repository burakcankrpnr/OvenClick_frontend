import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../src/styles/Logs.css';

const Logs = ({ machineId }) => {  // Pass machineId as a prop or set it appropriately
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get(`/api/logs/${machineId}`)
      .then(response => {
        setLogs(response.data);
      })
      .catch(error => {
        console.error("Logs alınırken hata oluştu:", error);
      });
  }, [machineId]);

  return (
    <div className="logs-container">
      <h1>Logs</h1>
      <table className="logs-table">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Action</th>
            <th>Machine ID</th>
            <th>Machine Name</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.timestamp}</td>
              <td>{log.action}</td>
              <td>{log.machine_id}</td>
              <td>{log.machine_name}</td>
              <td>{JSON.stringify(log.details)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Logs;
