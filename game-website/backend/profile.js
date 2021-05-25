const express = require('express');
const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    id: String,
    image: String,
    Games: [],
    Name: String
});

module.exports = mongoose.model('Profile', ProfileSchema);