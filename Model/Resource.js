const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  course: {type: String },
  title: {type: String },
  desc: { type: String },
   resUrl: { type: String },
});

module.exports = mongoose.model("Resource", cartSchema);
