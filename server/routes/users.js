var express = require('express');
var router = express.Router();
const User = require('../models/users');

//Register 
router.post('/add', async (req, res) => {
  try {
    const { customerName, companyName, email, brandName } = req.body;
    const newUser = new User({
      customerName,
      companyName,
      email,
      brandName
    });

    await newUser.save(); 
    res.status(201).json({ message: 'User register successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving user', error });
  }
});


//Login
router.post('/login', async (req, res) => {
  try {
    const { email, companyName } = req.body;
    const user = await User.findOne({ email, companyName });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or company name' });
    }
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});


module.exports = router;
