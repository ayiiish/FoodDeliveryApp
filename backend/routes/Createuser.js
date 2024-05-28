// routes/Createuser.js
const express = require('express');
const router = express.Router();
const User = require('../model/User');
const { body, validationResult } = require('express-validator');
const bycrypt = require('bcryptjs');

router.post('/createuser',
  body('email').isEmail(),
  body('name').isLength({ min: 5 }),
  body('password').isLength({ min: 6, max: 12 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bycrypt.genSalt(10);
    let secpassword = await bycrypt.hash(req.body.password, salt)

    try {
      // Check if the email already exists in the database
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists. Please use a different email.' });
      }

      // Check if the number has exactly 11 digits
      if (req.body.number.length !== 11) {
        return res.status(400).json({ message: 'Number should have exactly 11 digits.' });
      }

      // Check if the number is unique
      const existingNumber = await User.findOne({ number: req.body.number });
      if (existingNumber) {
        return res.status(400).json({ message: 'Number already exists. Please use a different number.' });
      }

      // Create the new user
      await User.create({
        name: req.body.name,
        password: secpassword,
        email: req.body.email,
        number: req.body.number,
        location: req.body.location
      });

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  });

module.exports = router;
