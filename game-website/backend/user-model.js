const mongoose = require('mongoose'); 

const UserSchema = mongoose.Schema({
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    name: String,
    imageurl: String
})

module.exports = mongoose.model('User', UserSchema);