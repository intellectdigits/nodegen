const mongoose = require('mongoose');

 const dataSchema = new mongoose.Schema(
  { 
 
 title: {
  
    type: String
  },
  instructor: {
  
    type: String
  },
  category: {
  
    type: String
  },
 desc: {
  
    type: String
  },
  ratings: {
  
    type: String
  },
 imgUrl: {
  
    type: String
  },
  price: {
  
    type: Number
  },

})

  module.exports = mongoose.model('courses', dataSchema)