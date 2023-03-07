require('dotenv').config()
const routes = require("./router/index")
const path = require('path');
const setMiddleware = require("./middleware/index")
const express = require('express')
const MyDataSource = require('./config/database')
const app = express()


const { PORT } = process.env

app.use(express.json());
const port = 10000

app.use(express.static(path.join(__dirname, 'public')));

setMiddleware(app)

app.get('/', (req, res) => {
  res.sendStatus(200)
})


app.use(routes);


MyDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
    console.log("database initialized successfully")
  })
  .catch((error) => console.log(error))

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

