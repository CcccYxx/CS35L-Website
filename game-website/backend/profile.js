const express = require('express');
const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    image: String,
    Games: [],
    Friends: [],
    Name: String,
    Email: String
});

module.exports = mongoose.model('Profile', ProfileSchema);