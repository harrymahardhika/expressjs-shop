const express = require('express')
const app = express()
const router = require('./app/router')
const cors = require('cors')

app.use(express.json())

const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}
app.use(cors(corsOptions))

app.use('/api', router)

module.exports = app
