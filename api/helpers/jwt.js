const expressJwt = require('express-jwt')

function authJwt() {
  const secret = process.env.JWT_SECRET

  return expressJwt({
    secret,
    algorithms: ['HS256'],
    isRevoked
  }).unless({
    path: [
      { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/orders(.*)/, methods: ['POST', 'OPTIONS'] },
      '/api/v1/users/login',
      '/api/v1/users/register'
    ]
  })
}

function isRevoked(req, payload, done) {
  console.log(req.url)
  console.log(req.method)
  if (payload.isAdmin) {
    done()
    // } else if (req.url.include('orders')) {
  }
  done(null, true)
}

module.exports = authJwt
