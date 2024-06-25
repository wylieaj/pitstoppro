import { useLoaderData, json } from "react-router-dom";
import FuelStationDetail from "../components/fuelStations/FuelStationDetail";

const DetailsPage = () => {
  const data = useLoaderData();
  return (
    <div className="text-primary p-4">
      <FuelStationDetail data={data} />
    </div>
  );
};

export default DetailsPage;

export const loader = async (params) => {
  const { brand, site_id } = params.params;
  let url = "";

  // CHECK IF RENDER HOSTING IS LIVE OR NOT
  try {
    const isRenderOnline = await fetch(
      "https://pitstoppro.onrender.com/getFuelStations"
    );
    url = "https://pitstoppro.onrender.com";
  } catch (error) {
    url = "http://localhost:8080";
  }

  try {
    const response = await fetch(`${url}/${brand}/${site_id}`);
    const resData = await response.json();
    return resData;
  } catch (error) {
    throw new json({
      title: "Page Not Found",
      message: "The page you were looking for does not exist.",
      status: 404,
    });
  }
};
