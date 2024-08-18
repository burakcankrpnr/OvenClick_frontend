import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LogsPage = ({ machine_id }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(`/logs/${machine_id}`);
        setLogs(response.data);
      } catch (err) {
        setError("Log verileri alınırken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [machine_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Loglar</h1>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Action</th>
            <th>Machine Name</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.timestamp}</td>
              <td>{log.action}</td>
              <td>{log.machine_name}</td>
              <td>{log.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogsPage;
