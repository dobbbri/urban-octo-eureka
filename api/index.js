const path = require('path')
const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
// helpers
const authJwt = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler')
// routes
const usersRoutes = require('./routes/users')
// const categoriesRoutes = require('./routes/categories')
// const productsRoutes = require('./routes/products')
// const ordersRoutes = require('./routes/orders')
// environment
require('dotenv/config')

app.use(cors())
app.options('*', cors())

// middleware
app.use(express.json())
app.use(morgan('tiny'))
app.use(authJwt())
app.use(express.static(path.join(__dirname, '/public/uploads')))

// routes
app.use('/v1/users', usersRoutes)
// app.use('/v1/categories', categoriesRoutes)
// app.use('/v1/products', productsRoutes)
// app.use('/v1/orders', ordersRoutes)

// error handler
app.use(errorHandler)

// Database
const connectionString = process.env.CONNECTION_STRING.replace('<database>', process.env.DB_NAME)

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME
  })
  .then(() => console.log(`DB: ${process.env.DB_NAME}, connection is ready...`))
  .catch((err) => console.log(err))

// Export express app
module.exports = app

// Start standalone Server if directly running
if (require.main === module) {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => console.log(`API server listening on port ${PORT}`))
}
