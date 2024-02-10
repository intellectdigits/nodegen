const mongoose = require('mongoose');

 const dataSchema = new mongoose.Schema({ email: {

    type: String
  }, password: {
  
    type: String
  }, username: {

    type: String
  },})

  module.exports = mongoose.model('form', dataSchema)