const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  id: { type: String, required: true },
  productname: { type: String, required: true },
  manufacture: { type: String,},
  price: { type: Number, required: true, min: 0 },
  count: { type: String },
  isNew: { type: Boolean },
  admin: {
    type: mongoose.Schema.Types.ObjectId, //講師說是pk，but why，應該是user的pk，product的fk
    ref: "User",
  }
});


module.exports = mongoose.model("Product", productSchema);