const jwt = require('jsonwebtoken')

function generateToken(payload) {
  const secret = process.env.JWT_SECRET
  return jwt.sign(payload, secret, { expiresIn: '1d' })
}

module.exports = generateToken
