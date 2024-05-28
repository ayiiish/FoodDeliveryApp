const mongoose = require('mongoose');
const mongoUrl = 'mongodb+srv://princekk5555:Ham01mad3524@cluster0.tw9sf5p.mongodb.net/foodexpress?retryWrites=true&w=majority';

// Create a Mongoose schema for your data
const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
});

// Create a Mongoose model based on the schema
const Item = mongoose.model('Item', itemSchema, 'items');
const Catagory = mongoose.model('Catagory', itemSchema, 'catagory');

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB!');

    // Use the model to fetch data from the collection
   
    const data = await Item.find({});
    const cdata = await Catagory.find({});
     global.items = data;
     global.catagory = cdata;
     



     
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
  }
};


module.exports = mongoDB();

