import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

export interface MapProps {
  showNearbyServices?: boolean;
  defaultFilter?: string;
  height?: string;
}

const defaultCenter: [number, number] = [30.374, 76.150]; // Nabha region approx

// Ensure default marker icons load correctly in Vite
const DefaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon as any;

const Map: React.FC<MapProps> = ({ showNearbyServices = true, defaultFilter = 'all', height = '400px' }) => {
  const sampleLocations = [
    { position: [30.374, 76.150] as [number, number], name: 'Nabha Civil Hospital', type: 'hospital' },
    { position: [30.37, 76.16] as [number, number], name: 'Community Clinic', type: 'clinic' },
    { position: [30.368, 76.145] as [number, number], name: 'City Pharmacy', type: 'pharmacy' },
  ].filter(s => defaultFilter === 'all' || s.type === defaultFilter);

  return (
    <div className="w-full rounded-md overflow-hidden border" style={{ height }}>
      <MapContainer center={defaultCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showNearbyServices && sampleLocations.map((loc, i) => (
          <Marker key={`${loc.name}-${i}`} position={loc.position}>
            <Popup>
              <div className="space-y-1">
                <div className="font-semibold">{loc.name}</div>
                <div className="text-xs text-muted-foreground">Type: {loc.type}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;


