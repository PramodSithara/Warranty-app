const bcrypt = require('bcrypt');

async function hashPassword (password) {
    const hash_Password = bcrypt.hash(password , 10);
    return hash_Password;
}

module.exports = { hashPassword }