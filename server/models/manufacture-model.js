const mongoose = require("mongoose");
const { Schema } = mongoose;

const manufactureSchema = new Schema({
  id: { type: String, required: true },
  MAN_NAME: { type: String, required: true },
  PHO_NUM: { type: String },
  MAN_LIAISON: { type: String },
  CITY: String,
  DISTRICT: String,
  ROAD: String,
  NUM: String,
  FLOOR: String,
});

module.exports = mongoose.model("Manufacture", manufactureSchema);
