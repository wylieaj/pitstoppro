require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const Brand = require("./models/brand");

const dbUrl = process.env.NODE_ENV
  ? process.env.MONGODB_URL
  : "mongodb://127.0.0.1:27017/pit-stop-pro";

// Mongo DB connection
const mongoose = require("mongoose");
mongoose.connect(dbUrl, {});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connection established!");
});

app.use(cors());

app.get("/getFuelStations", async (req, res) => {
  let payload = undefined;
  const { type } = req.query;

  // retrieve the brands from the database
  const dbBrands = await Brand.find({});

  // create an empty array
  let dbData = [];
  // map over the dbBrands array, fetch the data from the url and return the data to the array
  dbData = await Promise.all(
    dbBrands.map(async (brand) => {
      const brandURL = brand.url;
      console.log(brand.company);
      const response = await fetch(`${brandURL}`);

      if (response.status !== 200) {
        console.log(brand.comapny + " RESPONSE NOT 200");
        return;
      } else {
        console.log(brand.comapny + " RESPONSE 200");
        const resData = await response.json();
        return resData;
      }
    })
  );

  payload = dbData;

  if (type === "ungrouped") {
    let extractedData = [];
    console.log("UNGROUPED STATEMENT");
    dbData.map((brand) => {
      brand === undefined ? console.log("NULL") : console.log(brand);
      if (brand === undefined) {
        return;
      }
      brand.stations.map((station) => {
        const stationObj = { updated: brand.last_updated, ...station };
        extractedData = [...extractedData, stationObj];
      });
    });

    payload = extractedData;
  }

  res.send(payload);
});

app.get("/:brand/:site_id", async (req, res) => {
  const { brand, site_id } = req.params;
  try {
    // get the url for the brand
    const dbBrand = await Brand.findOne({ company: `${brand}` });
    const url = dbBrand.url;

    // Get fuel station by id
    const response = await fetch(`${url}`);
    const listOfStations = await response.json();
    let data = listOfStations.stations.filter((el) => el.site_id === site_id);

    const strArr = listOfStations.last_updated.split(" ");
    const dateTimeObj = { date: strArr[0], time: strArr[1] };
    const station = { ...dateTimeObj, ...data[0] };
    res.send(station);
  } catch (error) {
    res.send({ status: 500, message: "Internal Server Error" });
  }
});

// Listening port
const PORT = process.env.PORT || 8080;
app.listen(PORT, (req, res) => {
  console.log(`Listening on port: ${PORT}`);
});
