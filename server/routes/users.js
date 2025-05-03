var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const {verifyJwtToken} = require('../middleware/verifyJwt');
const { genarateJwtToken } = require('../middleware/genarateJwtToken');
const userService = require('../service/userService');


//Register 
router.post('/signup', async (req, res) => {
  try {
    const {email} = req.body;
    const isEmailExist = await userService.findUserByEmail(email);
    if (isEmailExist){
      res.status(400).json({ message: 'User Already Created using this email.' });
    }else{
      const user = await userService.createUser(req.body);
      if(user){
        res.status(200).json({ message: 'User Created Successfully.' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Error saving user', error });
  }
});



//Login
router.post('/signin', async (req, res) => {
  try {
    const { email, userPassword } = req.body;
    const foundUser = await userService.findUserByEmail(email);
    if (!foundUser) {
      return res.status(404).json({ message: 'No Account Found' });
    }
    const isMatch = await bcrypt.compare (userPassword , foundUser.userPassword);
    if (isMatch){
      const token = genarateJwtToken(foundUser.userName, foundUser.role);
      return res.status(200).json({ role: foundUser.role, token });
    }else{
      return res.status(404).json({ message: 'Password Incorrect' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});


router.get('/profile', async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(404).json({ message: 'Missing Token' });
    }
    const token = authHeader.split(' ')[1];

    const response = await verifyJwtToken(token);

    if (!response) {
      return res.status(401).json({ message: 'Invalid Token' });
    }
    return res.status(200).json({ userName: response.userName.toUpperCase(), role: response.role.toUpperCase() });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server Error' });
  }
});


module.exports = router;
