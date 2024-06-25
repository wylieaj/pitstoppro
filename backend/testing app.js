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

app.get("/asda", async (req, res) => {
  console.log("ASDA Url");
  const response = await fetch(
    "https://storelocator.asda.com/fuel_prices_data.json"
  );
  const resData = await response.json();
  res.send(resData);
});
app.get("/bp", async (req, res) => {
  console.log("bp Url");
  const response = await fetch(
    "https://www.bp.com/en_gb/united-kingdom/home/fuelprices/fuel_prices_data.json"
  );
  const resData = await response.json();
  res.send(resData);
});
app.get("/esso", async (req, res) => {
  console.log("esso Url");
  const response = await fetch("https://fuelprices.esso.co.uk/latestdata.json");
  const resData = await response.json();
  res.send(resData);
});
app.get("/jet", async (req, res) => {
  console.log("jet Url");
  const response = await fetch("https://jetlocal.co.uk/fuel_prices_data.json");
  const resData = await response.json();
  res.send(resData);
});
app.get("/morrisons", async (req, res) => {
  console.log("morrisons Url");
  const response = await fetch(
    "https://www.morrisons.com/fuel-prices/fuel.json"
  );
  const resData = await response.json();
  res.send(resData);
});
app.get("/sainsburys", async (req, res) => {
  console.log("sainsburys Url");
  const response = await fetch(
    "https://api.sainsburys.co.uk/v1/exports/latest/fuel_prices_data.json"
  );
  const resData = await response.json();
  res.send(resData);
});
app.get("/shell", async (req, res) => {
  console.log("shell Url");
  const response = await fetch("https://www.shell.co.uk/fuel-prices-data.html");
  const resData = await response.json();
  res.send(resData);
});
app.get("/tesco", async (req, res) => {
  console.log("tesco Url");
  const response = await fetch(
    "https://www.tesco.com/fuel_prices/fuel_prices_data.json"
  );
  const resData = await response.json();
  res.send(resData);
});

app.get("/test", async (req, res) => {
  // START OF GET URLS FROM DB
  const dbBrands = await Brand.find({});
  const getUrlForLoop = (obj) => {
    let data = [];
    for (const el of obj) {
      let url = el.url;
      data.push(url);
    }
    return data;
  };
  const urls = getUrlForLoop(dbBrands);
  console.log(urls);
  // END OF GET URLS FROM DB

  // START OF GET DATA FROM URL FOR LOOP
  const getDataForLoop = async (urls) => {
    let data = [];
    for (const url of urls) {
      let response = await fetch(url, {
        keepalive: true,
      });
      let resData = await response.json();
      data.push(resData);
    }
    return data;
  };
  const fetchedData = await getDataForLoop(urls);
  res.send(fetchedData);
  // END OF GET DATA FROM URL FOR LOOP
});

// Listening port
const PORT = process.env.PORT || 8080;
app.listen(PORT, (req, res) => {
  console.log(`Listening on port: ${PORT}`);
});
