const express = require("express");
const router = express.Router();
const User = require('./user-model');

router.get('/', (req, res) => {
    const user = User.find();
    res.json(user);
})

router.post('/', (req,res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        imageurl: req.body.imageurl
    });
    user.save()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json({message: err})
        });
}) 

module.exports = router;