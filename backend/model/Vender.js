const mongoose = require('mongoose');
const { Schema }= mongoose;
const venderschema = new Schema({
   
        vendername: String,
        companyname: String,
        vendernumber: String,
        venderpassword: String,
        resturentaddress: String,
       
      });
      

module.exports= mongoose.model('tests',venderschema);