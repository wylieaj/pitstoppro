import { priceFormatter } from "../../util/priceFromatter";
import { Link } from "react-router-dom";

const FuelStation = ({ fuelStation, fuelToggle }) => {
  const brandName = fuelStation.brand.toLowerCase();
  const fuelArr = priceFormatter(fuelStation.prices);

  // LOGIC FOR SETTING THE SPOTLIGHT FUEL AND BG COLOUR
  const spotlight = fuelArr.filter((el) => el.code === fuelToggle);
  let spotlightBg = "";
  if (spotlight.length > 0) {
    switch (spotlight[0].code) {
      case "E10":
        spotlightBg = "bg-unleaded";
        break;
      case "E5":
        spotlightBg = "bg-superUnleaded";
        break;
      case "B7":
        spotlightBg = "bg-diesel";
        break;
      case "SDV":
        spotlightBg = "bg-superDiesel";
        break;
      default:
        break;
    }
  } else {
    spotlightBg = "bg-primary";
  }

  // LOGIC FOR BRAND NAME TEXT FORMAT
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
            <p className="text-sm overflow-hidden truncate w-44 text-primaryDarken">
              {fuelStation.address}
            </p>
          </div>
        </div>

        <div
          className={`${spotlightBg} text-right w-28 ${
            spotlightBg === "bg-diesel" ? "text-primary" : "text-bgDarkSub"
          } text-sm h-full flex flex-col justify-between px-2 py-4 rounded-r-xl`}
        >
          <p className="font-bold text-base">
            {spotlight.length > 0 ? spotlight[0].type : "Unavailable"}
          </p>
          <div className="">
            <p className="text-right font-bold">
              {spotlight.length > 0 ? `${spotlight[0].price}p` : "Unavailabe"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FuelStation;
