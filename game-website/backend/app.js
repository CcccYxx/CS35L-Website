const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoute = require('./user-route.js')
const PORT = 8080;
const cors = require("cors");
require('dotenv').config()

//Middlewares
app.use(cors());
//bodyParser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/user', userRoute);

app.get("/", (req, res) => {
    res.send("Here are your users!");
})

mongoose.connect(
    process.env.DB_CONNECTION_STRING,
    { useUnifiedTopology: true },
    { useNewUrlParser: true },
    (req,res) => {
    console.log("Connected to the database");
});

app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
});

