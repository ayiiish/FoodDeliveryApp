const mongoose = require('mongoose');
const { Schema }= mongoose;
const dataschema = new Schema({
   
        CategoryName: String,
        name: String,
        img: String,
        options: [{
          half: String,
          full: String,
        }],
        description: String,
      });
      

module.exports= mongoose.model('items',dataschema);