const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: {type: String },
  totalPrice: { type: Number },

});

module.exports = mongoose.model("Cart", cartSchema);
