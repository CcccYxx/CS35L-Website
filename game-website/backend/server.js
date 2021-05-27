const express = require("express");
const mongoose = require('mongoose');
const Profile = require("./profile");
const User = require("./user"); 
const app = express();
const uri = "mongodb+srv://Gamewebsite:WqvWDOvAEHUPfevX@cluster0.h0txi.mongodb.net/UserInformation?retryWrites=true&w=majority";
import postRoutes from './posts';

//Middleware
app.use(express.urlencoded({ extended: false })); //parse URL-encoded bodies
app.use(express.json()); //parse JSON bodies

app.use('/posts', postRoutes);

mongoose.connect(uri, 
    { useUnifiedTopology: true, useNewUrlParser: true},
    function(err){
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

app.post('/profile', (request, response) => {
    const {id, image, Games, Email, Name} = request.body;
    const profile = new Profile({id, image, Games, Email, Name});
    profile.save(function(err) {
        if(err) {
            console.log(err);
        } else{
            response.status(200).send("Profile was saved!");
        }
    });
})

app.listen(8080, function() {
    console.log("Server is running on Port: 8080");
  });
