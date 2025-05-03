const Users = require('../models/users');
const { hashPassword } = require('../middleware/hash')

//Find user by email
const findUserByEmail = async (email) => {
    try{
        const user = await Users.findOne({ email });
        return user;
    }catch(err){
        throw err;
    }
}

//create users
const createUser = async (payload) => {
    try{
        const { userName , userPassword, email, role } = payload;
        const hash_Password = await hashPassword(userPassword);
        const newUser = new Users({ userName , userPassword : hash_Password, email, role });
        const savedUser = await newUser.save();
        return savedUser;
    }catch(err){
        throw err;
    }
}

module.exports = { 
    findUserByEmail , 
    createUser
}