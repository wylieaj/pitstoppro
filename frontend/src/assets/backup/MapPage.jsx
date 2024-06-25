import {
  Link,
  json,
  useNavigation,
  useRouteLoaderData,
} from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useEffect, useState } from "react";

import MapSearchForm from "../components/Forms/MapSearchForm";
import { sortDataByDistance } from "../util/loc";

const MapPage = () => {
  const allData = useRouteLoaderData("allServiceStations");
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [stations, setStations] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    if (!coords.lat) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        const sortedData = sortDataByDistance(
          allData,
          position.coords.latitude,
          position.coords.longitude
        );
        setStations(sortedData);
      });
    }
  }, [setCoords]);

  const updateCoords = async (data) => {
    setCoords({
      lat: data.lat,
      lon: data.lon,
    });
    const sortedData = sortDataByDistance(allData, data.lat, data.lon);
    setStations(sortedData);
  };

  return (
    <>
      {coords.lat && (
        <section className="max-h-full flex flex-col mt-5">
          <MapContainer
            key={coords.lat}
            style={{ height: "75vh" }}
            center={[coords.lat, coords.lon]}
            zoom={14}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            />
            {stations.map((station) => {
              return (
                <Marker
                  key={station.site_id + station.address}
                  position={[
                    station.location.latitude,
                    station.location.longitude,
                  ]}
                >
                  <Link to={`${station.brand}/${station.site_id}`}>
                    <Popup className="cursor-pointer">
                      <div>
                        {navigation.state === "loading"
                          ? "Loading ..."
                          : `${station.brand} - ${station.address}`}
                      </div>
                    </Popup>
                  </Link>
                </Marker>
              );
            })}
          </MapContainer>
          <div className="flex flex-col justify-center items-center">
            <MapSearchForm updateCoords={updateCoords} />
          </div>
        </section>
      )}
    </>
  );
};

export default MapPage;

export const loader = async () => {
  try {
    const response = await fetch("http://localhost:8080/");

    if (!response.ok) {
      throw new json(
        {
          title: "Failed to fetch data ",
          message:
            "Sorry, we have encountered an error when fetching the stations. Please try again later.",
        },
        { status: 404 }
      );
    }

    const resData = await response.json();
    return resData;
  } catch (error) {
    throw new json(
      {
        title: "Internal Server Error",
        message:
          "The server encountered an error and could not complete your request.",
      },
      { status: 500 }
    );
  }
};
