import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix leaflet marker icon issue (run only on client)
export default function LocationMap() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  const locations = [
    {
      lat: -36.897603,
      lng: 174.81503,
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

  if (!isClient) {
    return <div>Loading map...</div>;
  }

  return (
    <MapContainer
      center={[-40.2587952, 174.7896896]}
      zoom={6}
      scrollWheelZoom={false}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map(({ lat, lng, label, address }, idx) => (
        <Marker key={idx} position={[lat, lng]}>
          <Popup>
            <strong>{label}</strong>
            <br />
            {address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
