const express = require('express');
//const { getPosts, createPost } = require ('../controllers/posts.js');
const getPosts = require('../controllers/posts')
const creatPost = require ('../controllers/posts')
const router = express.Router();

router.get('/', getPosts);
//router.post('/', createPost)

module.exports = router;
