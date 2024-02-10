const mongoose = require('mongoose');

 const dataSchema = new mongoose.Schema({ test1: {
  
    type: String
  }, test2: {
  
    type: String
  },})

  module.exports = mongoose.model('testrun', dataSchema)