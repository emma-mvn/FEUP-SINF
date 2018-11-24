const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

require('dotenv').config()

const uuid = require('uuid/v4')
const session = require('express-session')

// REQUIRE ROUTS
const index = require('./routes/index')
const orders = require('./routes/orders')
const customers = require('./routes/customers')

const app = express()

app.use(session({
  genid: () => {
    return uuid()
  },
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// USES ROUTES
app.use('/', index)
app.use('/orders', orders)
app.use('/customers', customers)

const port = 5000
app.listen(port, () => console.log(`Server started on port ${port}`))
