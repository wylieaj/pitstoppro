import { priceFormatter } from "../../util/priceFromatter";
import { Link } from "react-router-dom";

const FuelStation = ({ fuelStation }) => {
  const brandName = fuelStation.brand.toLowerCase();
  const fuelArr = priceFormatter(fuelStation.prices);

  const lowest = fuelArr.reduce((prev, curr) =>
    prev.price < curr.price ? prev : curr
  );

  let isCapitalized = "capitalize";

  if (brandName === "bp") {
    isCapitalized = "uppercase";
  }

  return (
    <Link to={`${brandName}/${fuelStation.site_id}`} state={fuelStation}>
      <div className="flex items-center text-bgDark justify-between bg-bgDarkSub rounded-xl">
        <div className="flex flex-col px-2">
          <h2
            className={`text-2xl text-primary font-semibold ${isCapitalized}`}
          >
            {brandName}
          </h2>
          <div className="">
            <p className="text-primaryDarken">{fuelStation.postcode}</p>
            <p className="text-sm line-clamp-1 text-primaryDarken">
              {fuelStation.address}
            </p>
          </div>
        </div>

        <div
          className={`bg-green-600 text-bgDark text-sm h-full flex flex-col justify-between px-2 py-4 rounded-r-xl`}
        >
          <p className="font-bold text-base">{lowest.type}</p>
          <div className="">
            <p className="text-right font-bold">{lowest.price}p</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FuelStation;
