require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const scoreRoutes = require('./routes/score')

const port = process.env.PORT || "4000";
const connection_url = `mongodb+srv://admin:mongodb99@cluster0.g7wedbo.mongodb.net/?retryWrites=true&w=majority`;

const app = express()

app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

 app.use('/api/user', userRoutes)
 app.use('/api/score', scoreRoutes)

mongoose.set("strictQuery", false);
mongoose.connect(connection_url)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to MongoDB - port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })