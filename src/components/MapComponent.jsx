import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; 

const machineIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1196/1196582.png', 
  iconSize: [32, 32], 
  iconAnchor: [16, 32], 
  popupAnchor: [0, -32], 
});

const center = [41.0082, 28.9784];
const zoom = 6;

const MapComponent = () => {
  const markers = [
    { position: [41.0082, 28.9784], text: 'oven1' }, 
    { position: [39.9334, 32.8597], text: 'oven2' },   
    { position: [38.4192, 27.1287], text: 'oven3' },   
  ];

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          icon={machineIcon} 
        >
          <Popup>
            {marker.text}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
