const mongoose = require('mongoose')

const schema = new mongoose.Schema({ 
    userName: {type : String, required : true},
    userPassword: {type : String, required : true},
    email: {type : String, required : true},
    role: {type : String, required : false, default: 'user'}
}, { timestamps: true});

const Users = mongoose.model('Users', schema);
module.exports = Users;