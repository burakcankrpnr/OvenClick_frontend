
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 

const center = [51.505, -0.09]; 
const zoom = 10; 

const MapComponent = () => {
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center}>
        <Popup>
          A sample marker on the map.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
