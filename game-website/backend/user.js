const mongoose = require("mongoose");
const User = new mongoose.Schema({
    name: string,
    email: string,
    profileimage: string,
    password:  string
})

module.exports = User;