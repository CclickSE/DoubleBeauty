const mongoose = require("mongoose");
const { Schema } = mongoose;

const cusSchema = new Schema({
  id: { type: String, required: [true, "請填入客戶編號，以便分類辨識。"] },
  CUS_NAME: { type: String, required: [true, "客戶名稱為必填喔"] },
  PHO_NUM: { type: String, maxlength: 10 },
  LEVEL: { type: Number, required: true, default: 0 },
  CUS_LIAISON: {type: String},
  UIN: { type: String },
    CITY: String,
    DISTRICT: String,
    ROAD: String,
    NUM: String,
    FLOOR: String,
  isNew: { type: Boolean },
});

module.exports = mongoose.model("Customer", cusSchema);
