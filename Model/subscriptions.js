const mongoose = require('mongoose');

 const dataSchema = new mongoose.Schema(
  { fullName: {
  
    type: String
  },
  category: {
  
    type: String
  },
  email: {
  
    type: String
  },
  password: {
  
    type: String
  },
 course: {
  
    type: String
  },
  instructor: {
  
    type: String
  },
  startDate: {
  
    type: Date
  },
  startTime: {
  
    type: String
  },
  price: {
  
    type: Number
  },
  paymentStatus: {
  
    type: String
  }
  ,
  token: {
  
    type: String
  },
})

  module.exports = mongoose.model('mogh', dataSchema)