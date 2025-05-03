const mongoose = require('mongoose')

const schema = new mongoose.Schema({ 
    customerName: {type : String, required : true},
    companyName: {type : String, required : true},
    email: {type : String, required : false},
    brandName: {type : String, required : false},
    upperLimit: { type: Number, required: true, default:0 }

}, { timestamps: true});

const Customers = mongoose.model('Customers', schema);
module.exports = Customers;