import { useEffect, useState } from "react";
import PostcodeForm from "../components/forms/PostcodeForm/PostcodeForm";
import { fetchPostcode } from "../util/fetchPostcode";
import { json, useLoaderData } from "react-router-dom";
import { sortDataByDistance } from "../util/loc";
import FuelStationList from "../components/fuelStations/FuelStationList";

const HomePage = () => {
  const [fuelStations, setFuelStations] = useState([]);
  const [isInvalid, setIsInvalid] = useState();
  const [fuelToggle, setFuelToggle] = useState("E10");
  const data = useLoaderData();

  const savedPostcode = sessionStorage.getItem("postcode");

  useEffect(() => {
    if (savedPostcode) {
      getFuelStations(savedPostcode);
    }
  }, []);

  const handleFuelToggle = (evt) => {
    setFuelToggle(evt.target.value);
  };

  const getFuelStations = async (postcode) => {
    if (postcode === "") {
      setFuelStations([]);
      setIsInvalid("Postcode field is empty");
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
      setFuelStations([]);
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
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold text-primary">
              Nearby Locations
            </p>
            <p className=" font-semibold text-primary">
              <select
                name=""
                id=""
                className="bg-bgDarkSub"
                onChange={handleFuelToggle}
              >
                <option value="E10" defaultChecked>
                  Unleaded
                </option>
                <option value="E5">Super Unleaded</option>
                <option value="B7">Diesel</option>
                <option value="SDV">Super Diesel</option>
              </select>
            </p>
          </div>

          <div>
            <FuelStationList
              fuelStations={fuelStations}
              fuelToggle={fuelToggle}
            />
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
      "https://pitstoppro.onrender.com/getFuelStations"
    );
    console.log(isRenderOnline);
    url = "https://pitstoppro.onrender.com";
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
