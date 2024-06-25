import { useEffect, useState } from "react";
import PostcodeForm from "../components/forms/PostcodeForm/PostcodeForm";
import { fetchPostcode } from "../util/fetchPostcode";
import { json, useLoaderData } from "react-router-dom";
import { sortDataByDistance } from "../util/loc";
import FuelStationList from "../components/fuelStations/FuelStationList";

const HomePage = () => {
  const [fuelStations, setFuelStations] = useState([]);
  const [isInvalid, setIsInvalid] = useState();
  const data = useLoaderData();

  const savedPostcode = sessionStorage.getItem("postcode");

  useEffect(() => {
    if (savedPostcode) {
      getFuelStations(savedPostcode);
    }
  }, []);

  const getFuelStations = async (postcode) => {
    if (postcode === "") {
      setFuelStations([]);
      setIsInvalid("Postcode field left empty");
      return;
    }

    try {
      const response = await fetchPostcode(postcode);
      const sortedStations = sortDataByDistance(
        data,
        response.lat,
        response.lon
      );

      sessionStorage.setItem("postcode", postcode);
      setFuelStations(sortedStations);
    } catch (error) {
      setIsInvalid("Invalid Postcode");
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-4 px-4">
      <div>
        <PostcodeForm
          getPostcode={getFuelStations}
          savedPostcode={savedPostcode}
        />
      </div>
      {fuelStations.length < 1 ? (
        <div className="text-primary text-center">
          {isInvalid && (
            <p className="text-red-500 text-sm bg-bgDark py-4 rounded-xl">
              {isInvalid}
            </p>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2 transition-all">
          <div className="flex justify-between">
            <p className="text-xl font-semibold text-primary">
              Nearby Locations
            </p>
            <p className="text-xl font-semibold text-primary">Cheapest Fuel</p>
          </div>

          <div>
            <FuelStationList fuelStations={fuelStations} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

export const loader = async () => {
  let url = "";

  // CHECK IF RENDER HOSTING IS LIVE OR NOT
  try {
    const isRenderOnline = await fetch(
      "https://pit-stop-pro.onrender.com/getFuelStations"
    );
    url = "https://pit-stop-pro.onrender.com";
  } catch (error) {
    url = "http://localhost:8080";
  }

  try {
    const response = await fetch(`${url}/getFuelStations?type=ungrouped`);

    const resData = await response.json();

    return resData;
  } catch (error) {
    throw new json({
      title: "Service Unavailable",
      message: "Sorry, something went wrong. Please try again later.",
      status: 404,
    });
  }
};
