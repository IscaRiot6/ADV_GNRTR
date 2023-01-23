const express = require('express')
// const mongoose = require('mongoose')
const app = express()
const port = 8000

const userRoute = require('./routes/userRoute')
const adviceRoute = require('./routes/adviceRoute')
const dotenv = require('dotenv')
dotenv.config()

const morgan = require('morgan')

app.use(morgan('tiny'))

const bodyparser = require('body-parser')
const cors = require('cors')

app.use(
  cors({
    origin: '*'
  })
)

app.use(bodyparser.json())

app.use('/user', userRoute)
app.use('/advice', adviceRoute)

app.listen(port, () => {
  console.log(`server is connected on port : ${port} `)
})
