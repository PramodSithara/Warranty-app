var express = require('express');
var router = express.Router();
const User = require('../models/users');


router.post('/update', async (req, res) => {
    try{
        const { upperLimit, companyName } = req.body;
        const user = await User.findOne({companyName})
        if(user){
            user.upperLimit = upperLimit;
            await user.save();
            res.status(200).json({ message: 'Upper limit updated successfully'});
        }else{
            res.status(404).json({ message: 'User not found' });
        }
    }catch(error){
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
});


module.exports = router;