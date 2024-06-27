export const priceFormatter = (pricesObj) => {
  let prices = [];

  Object.entries(pricesObj).forEach(([key, value]) => {
    const price = value.toFixed(1);
    let type = "";

    switch (key) {
      case "E5":
        type = "S.Unleaded";
        break;
      case "E10":
        type = "Unleaded";
        break;
      case "B7":
        type = "Diesel";
        break;
      case "SDV":
        type = "S.Diesel";
        break;

      default:
        break;
    }

    prices = [...prices, { type, price, code: key }];
  });

  return prices;
};
