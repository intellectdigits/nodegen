const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: {type: String },
  title: {type: String },
  subDate: { type: String },

});

module.exports = mongoose.model("Learning", cartSchema);
