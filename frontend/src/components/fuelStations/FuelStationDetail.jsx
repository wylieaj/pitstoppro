import { priceFormatter } from "../../util/priceFromatter";
import LeafletMap from "../leaflet/LeafletMap";

const FuelStationDetail = ({ data }) => {
  const fuelArr = priceFormatter(data.prices);

  return (
    <div className="bg-bgDark rounded-xl p-4 flex flex-col gap-8">
      <div className="">
        <LeafletMap coords={data.location} height="25svh" />
        <p className="text-center mt-2">Last updated: {data.date}</p>
      </div>

      <div className="bg-bgDarkSub rounded-xl p-2">
        <h1 className="text-xl font-bold">{data.brand}</h1>
        <p className="text-xs text-primaryDarken">{data.address}</p>
        <p className="text-xs text-primaryDarken">{data.postcode}</p>
      </div>

      <div>
        <h2 className="mb-1 px-2">Pump Prices</h2>
        <div className="bg-bgDarkSub rounded-xl p-2 flex flex-col gap-4">
          {fuelArr.map((el, idx) => {
            let bgColour = "";
            let txColour = "";

            // tx and bg colour switch for the prices
            switch (el.type) {
              case "Unleaded":
                bgColour = "bg-unleaded";
                txColour = "text-unleaded";

                break;
              case "Super Unleaded":
                bgColour = "bg-superUnleaded";
                txColour = "text-superUnleaded";

                break;
              case "Diesel":
                bgColour = "bg-diesel";
                txColour = "text-diesel";

                break;
              case "Super Diesel":
                bgColour = "bg-superDiesel";
                txColour = "text-superDiesel";

                break;

              default:
                break;
            }

            return (
              <div
                key={idx}
                className="flex items-center text-bgDark justify-between bg-bgDark rounded-xl"
              >
                <div className="px-2">
                  <p className={`font-bold text-primary`}>{el.type}</p>
                </div>
                <div
                  className={`${bgColour} h-full flex justify-center items-center px-2 py-4 rounded-l-lg rounded-r-xl`}
                >
                  <div
                    className={`bg-primary ${txColour} p-1 rounded-full font-bold`}
                  >
                    {el.price}p
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FuelStationDetail;
