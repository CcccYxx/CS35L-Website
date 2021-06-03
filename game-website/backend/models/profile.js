const express = require('express');
const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    image: String,
    bio: String,
    people: [],
    Games: [],
    Friends: [],
    Friendids: [],
    Name: String,
    Email: String
});

module.exports = mongoose.model('Profile', ProfileSchema);