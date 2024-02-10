const mongoose = require('mongoose');

 const dataSchema = new mongoose.Schema({ contact1: {
    required: true,
    type: String
  }, contact2: {
    required: true,
    type: String
  }, contact3: {
    required: true,
    type: String
  },})

  module.exports = mongoose.model('Data', dataSchema)