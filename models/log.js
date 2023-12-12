const mongoose = require("mongoose");


const logSchema = new mongoose.Schema({
  ip_address: {
    type: String
  },
  timestamp: {
    type: Date
  },
  tried_Ac: {
    email: {
        type:String
    },
    password:{
        type:String
    }
  },
  action: {
    type:String
  }
});


module.exports = mongoose.model("log", logSchema);
