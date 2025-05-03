var express = require('express');
var router = express.Router();
const customerService = require('../service/customerService')

//Customer Register
router.post('/signup', async (req, res) => {
  try {
    const {email} = req.body;
    const isEmailExist = await customerService.findCustomersById(email);
    if (isEmailExist){
      res.status(300).json({ message: 'Customer Already Created using this email.' });
    }else{
      const customer = await customerService.createCustomers(req.body);
      if(customer){
        res.status(200).json({ message: 'Customer Created Successfully.' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Error saving customer', error });
  }
});


//Get 
router.get('/fetch', async (req, res) => {
  try {
   customersRes = await customerService.findCustomers();
   res.status(200).json(customersRes);
  } catch (error) {
    res.status(500).json(error);
  }
});



// Update customer lowerLimit and upperLimit
router.put('/update', async (req, res) => {
  try {
    const { companyName, upperLimit } = req.body;
    const customerResponse = await customerService.updateCustomers({ companyName, upperLimit });

    if (customerResponse) {
      res.status(200).json({ message: 'Upper limit updated successfully', data: customerResponse });
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating limits', error: error.message });
  }
});




module.exports = router;