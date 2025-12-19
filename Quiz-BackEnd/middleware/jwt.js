const jwt = require('jsonwebtoken')

const generateToken = (id, role, secret, duration) => {
    return jwt.sign({ id, role }, secret, {
        expiresIn: duration,
    })
}

module.exports = generateToken
