// routes.js
const express = require('express');
const router = express.Router();
const Vender = require('../model/Vender'); // Update with the actual path to your model file

// Define the route to create a vendor
router.post('/createvendor', async (req, res) => {
  try {
    // Assuming you're receiving the vendor data in the request body
  
    // Create a new vendor using the model
    const newVendor = new Vender({
      vendername:"hammad",
      companyname: "abc",
      vendernumber: "0321",
      venderpassword: "123",
      resturentaddress: "ncjshcjhsc"
    });

    // Save the vendor to the database
    const savedVendor = await newVendor.save();

    res.status(201).json({ message: 'Vendor created successfully', vendor: savedVendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});


module.exports = router;
