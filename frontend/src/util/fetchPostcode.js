import { json, redirect } from "react-router-dom";

export const fetchPostcode = async (postcode) => {
  try {
    const response = await fetch(
      `https://api.postcodes.io/postcodes/${postcode}`
    );
    const data = await response.json();
    const obj = { lat: data.result.latitude, lon: data.result.longitude };

    return obj;
  } catch (error) {
    console.log(error);
  }
};
