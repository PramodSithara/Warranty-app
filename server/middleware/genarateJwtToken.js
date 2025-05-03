const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function genarateJwtToken(userName, role) {
    return jwt.sign({ userName, role }, JWT_SECRET, {
        expiresIn: '10h'
    });
}

module.exports = { genarateJwtToken }