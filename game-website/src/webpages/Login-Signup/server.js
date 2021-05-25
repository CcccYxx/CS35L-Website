const express = require("express");
const mongoose = require('mongoose');
const User = require("./user");
const app = express();

const uri = "mongodb+srv://Lyds:SavTSHKEZlVZmyRu@cluster0.ropdn.mongodb.netmyFirstDatabase?retryWrites=true&w=majority";

//Middleware
app.use(express.urlencoded({ extended: false })); //parse URL-encoded bodies
app.use(express.json()); //parse JSON bodies

mongoose.connect(uri, { useNewUrlParser: true },function(err){
    if(err){
        throw err;
    } else {
        console.log(`connected to ${uri}`);
    }
});

app.post('/api/register', function(req, res) {
    const { email, password } = req.body;
    const user = new User({ email, password});
    user.save(function(err) {
        if(err) {
            console.log(err);
        } else{
            res.status(200).send("You are registered!");
        }
    });
});