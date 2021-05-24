const express = require("express");
const mongoose = require("mongoose");

require('dotenv').config()

const app = express();

app.use(express.json());

const PORT = 3000;

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

