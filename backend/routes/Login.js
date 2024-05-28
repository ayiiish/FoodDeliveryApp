// routes/Login.js
const express = require('express');
const router = express.Router();
const User = require('../model/User');
const { body, validationResult } = require('express-validator');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtsecret = "mynameishammadim23yearold#"
router.post('/login',
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if the user with the given email exists in the database
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ message: 'User not found. Please check your credentials.' });
      }
      const cpassword = await bycrypt.compare(req.body.password,user.password)

      // Check if the password is correct
      if (!cpassword) {
        return res.status(400).json({ message: 'Invalid password. Please check your credentials.' });
      }
      const data ={
        user:{
          id:user.id
        }
      }
      const authtoken = jwt.sign(data,jwtsecret)

      // If the email and password are correct, send a success response
      res.json({ success: true, authtoken:authtoken});
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  });

module.exports = router;
