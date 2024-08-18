import React from 'react';
import MapComponent from '../components/MapComponent';
import '../styles/Maps.css'; 

const Maps = () => {
  return (
    <div className="maps-container">
      <h1 className="maps-title">Maps</h1>
      <MapComponent />
    </div>
  );
};

export default Maps;
