const express = require("express");
const cors = require("cors");
require('dotenv').config()

const app = express();

// parse application/json
app.use(express.json())

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

var corsOptions = {
  origin: 'http://localhost:3000'
}
// use cors options
app.use(cors(corsOptions))

// 
const db = require("./app/models");

// routes
// const blog = require('./app/routes/blog')
// app.use('/api/blog', blog)

// listening port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});