const mongoose = require("mongoose");

const chartsSchema = new mongoose.Schema({

  usd: { type: Number},
  cad: { type: Number},
  eur: { type: Number},
 crypto: { type: Number},
});

module.exports = mongoose.model("charts", chartsSchema);