const mongoose = require("mongoose");
const { Schema } = mongoose;

const brandSchema = new Schema({
  company: String,
  url: String,
});

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
