import { useLoaderData } from "react-router-dom";
import pumpImg from "../assets/petrolPump.jpg";
import { priceFormatter } from "../../util/priceFromatter";

const StationDetailPage = () => {
  const data = useLoaderData();

  const { brand, address, location, postcode, prices, updatedTime } = data;
  let pricesArr = [];

  Object.entries(prices).forEach(([key, value]) => {
    const priceObj = priceFormatter(key, value);
    pricesArr = [...pricesArr, priceObj];
  });

  return (
    <div className="h-[calc(100vh-4rem)] mx-3 mt-2">
      <div className="h-full grid grid-rows-2 grid-flow-row auto-rows-auto gap-2">
        <section className="h-full flex flex-col overflow-hidden rounded-b-xl">
          <div className="flex flex-col">
            <div className="px-5 py-2 text-ivory bg-gunmetal flex justify-between items-center rounded-t-xl">
              <div>
                <p className="text-xl">{brand}</p>
                <p className="text-sm">
                  {address}, {postcode}
                </p>
              </div>
              <div className="text-sm text-end self-end">
                <p>Updated:</p>
                <p>{updatedTime}</p>
              </div>
            </div>
          </div>
          <div className="">
            <img
              src={pumpImg}
              alt=""
              className="object-center rounded-b-xl"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </section>

        <section className="mb-4 rounded-xl bg-gunmetal">
          <div className="h-full flex flex-col justify-evenly items-center mx-5">
            {pricesArr &&
              pricesArr.map((price, index) => {
                return (
                  <div
                    key={index}
                    className="w-full flex justify-between p-1 rounded border-b-2 text-ivory"
                  >
                    <div>
                      <p className="font-semibold text-red-500">Fuel</p>
                      <p>{price.fuelType}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-red-500">Price</p>
                      <p>{price.price}p</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default StationDetailPage;

export const loader = async (params) => {
  const param = params.params;
  try {
    const response = await fetch("http://localhost:8080/");
    const resData = await response.json();

    const brandData = resData.serviceStations.find(
      (el) => el.brand === param.brand
    );
    const updatedTime = brandData.last_updated;
    let stationData = brandData.stations.find((el) => el.site_id === param.id);
    stationData = { ...stationData, updatedTime };
    return stationData;
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
