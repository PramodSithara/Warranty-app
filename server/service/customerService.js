const Customers = require('../models/customers');


//Find all customers
const findCustomersById = async(email) => {
    try{
        const customer = await Customers.findOne({email});
        return customer;
    }catch(err){
        throw err;
    }
}


//Find all customers
const findCustomers = async() => {
    try{
        const customer = await Customers.find({});
        return customer;
    }catch(err){
        throw err;
    }
}

//create users
const createCustomers = async (payload) => {
    try{
        const { customerName , companyName, email, brandName, upperLimit } = payload;
        const newCustomer = new Customers({customerName , companyName, email, brandName, upperLimit});
        const savedCustomer = await newCustomer.save();
        return savedCustomer;
    }catch(err){
        throw err;
    }
}


const updateCustomers = async (payload) => {
    try {
      const { companyName, upperLimit } = payload;
      const customer = await Customers.findOne({ companyName });
  
      if (customer) {
        customer.upperLimit = upperLimit;
  
        const updatedCustomer = await customer.save();
        return updatedCustomer;
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  };
  

module.exports = { 
    findCustomersById,
    findCustomers, 
    createCustomers,
    updateCustomers
}