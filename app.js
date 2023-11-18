const express = require('express')
const app = express()
const router = require('./app/router')
const cors = require('cors')
const morgan = require('morgan')

app.use(morgan('dev'))
app.use(express.json())

// CORS
const corsOptions = {
  origin: process.env.CLIENT_URLS.split(','),
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}
app.use(cors(corsOptions))

app.use('/api', router)

module.exports = app
