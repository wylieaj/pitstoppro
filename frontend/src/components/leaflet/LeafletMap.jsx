import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

const LeafletMap = ({ coords, height }) => {
  return (
    <MapContainer
      style={{ height: height }}
      center={[coords.latitude, coords.longitude]}
      zoom={16}
      scrollWheelZoom={true}
      dragging={false}
    >
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[coords.latitude, coords.longitude]}></Marker>
    </MapContainer>
  );
};

export default LeafletMap;
