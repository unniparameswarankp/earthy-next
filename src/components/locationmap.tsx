'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix marker icon issues in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const locations = [
  {
    lat: -36.897603,
    lng: 174.815030,
    label: 'Auckland Office',
    address: '8 Stanway Place, Ellerslie, Auckland 1051',
  },
  {
    lat: -41.2587952,
    lng: 174.7896896,
    label: 'Wellington Office',
    address: '34 Kaiwharawhara Road, Wellington 6035',
  },
  {
    lat: -43.538496,
    lng: 172.5563941,
    label: 'Christchurch Office',
    address: "Unit 4, 4-6 O'Brien's Road, Sockburn, Christchurch 8042",
  },
];

export default function LocationMap() {
  return (
    <MapContainer
      center={[-39.8, 174.0]} 
      zoom={6}
      scrollWheelZoom={false}
      style={{ height: '700px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((loc, index) => (
        <Marker key={index} position={[loc.lat, loc.lng]}>
          <Popup>
            <strong>{loc.label}</strong>
            <br />
            {loc.address}
            <strong>{loc.label}</strong>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
