require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/routes')
const app = express()
const { connectDB } = require('./config/db')
const cookieParser = require('cookie-parser')
const cors = require('cors');


// Connect Database
if (process.env.NODE_ENV !== 'test') {
  connectDB()
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser()) 

app.use(
  cors({
    origin: "http://react-docker-pupeteer.com",
    credentials: true,
  })
);

// for testing purposes
app.get('/', (req, res) => {
  res.status(200).send({ msg: 'Welcome API !!!' })
})

routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message })
})

module.exports = app