import { Link, json, useRouteLoaderData } from "react-router-dom";
import { sortDataByDistance } from "../../util/loc";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useEffect, useState } from "react";

const MapPage = () => {
  const data = useRouteLoaderData("allServiceStations");
  const [stations, setStations] = useState([]);

  useEffect(() => {
    const sortData = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const sortedData = sortDataByDistance(
          data,
          position.coords.latitude,
          position.coords.longitude
        );
        setStations(sortedData);
      });
    };
    sortData();
  }, []);

  const displayStations = stations.slice(0, 75);

  return (
    <section className="flex flex-col gap-5">
      <MapContainer
        style={{ height: "75vh" }}
        center={[51.505, -0.09]}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {displayStations.map((station) => {
          return (
            <Marker
              key={station.site_id + station.address}
              position={[station.location.latitude, station.location.longitude]}
            >
              <Popup>
                <h2>{station.brand}</h2>
                <p>{station.address}</p>
                <p>{station.postcode}</p>
                <Link to={"/"}>Details</Link>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </section>
  );
};

export default MapPage;

export const loader = async () => {
  try {
    const response = await fetch("http://localhost:8080/");

    if (!response.ok) {
      throw new json({ status: 400, message: "Sorry, request failed!" });
    }

    const resData = await response.json();
    return resData;
  } catch (error) {
    throw new json({ status: 400, message: error });
  }
};
