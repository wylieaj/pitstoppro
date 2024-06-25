import FuelStation from "./FuelStation";

const FuelStationList = ({ fuelStations }) => {
  return (
    <div className="text-primary bg-bgDark p-4 rounded-xl flex flex-col gap-4 mb-4">
      {fuelStations.map((el) => {
        return <FuelStation key={el.brand + el.site_id} fuelStation={el} />;
      })}
    </div>
  );
};

export default FuelStationList;
