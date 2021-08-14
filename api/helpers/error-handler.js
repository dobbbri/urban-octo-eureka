function errorHandler(err, req, res, next) {
  // jwt authentication error
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send('The user is not authorized')
  }

  if (err.name === 'ValidationError') {
    return res.status(401).send(err)
  }

  // default to 500 server error
  res.status(500).send(err)
}

module.exports = errorHandler
