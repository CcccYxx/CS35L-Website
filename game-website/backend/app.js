const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoute = require('./user-route.js')
const PORT = 8080;
require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.DB_CONNECTION_STRING;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

//bodyParser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/user', userRoute);

app.get("/", (req, res) => {
    res.send("Here are your users!");
})

mongoose.connect(
    process.env.DB_CONNECTION_STRING,
    (req,res) => {
    console.log("Connected to the database");
});

app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
});

