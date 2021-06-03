const express = require("express");
const mongoose = require('mongoose');
const Profile = require("./profile");
const User = require("./user"); 
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const withAuth = require('./middleware/middleware');
const { request } = require("express");
const uri = "mongodb+srv://Gamewebsite:WqvWDOvAEHUPfevX@cluster0.h0txi.mongodb.net/UserInformation?retryWrites=true&w=majority";
// import postRoutes from './posts';

//move token to .env file
const secret = "website-secret-string"

//Middleware
app.use(express.urlencoded({ extended: false })); //parse URL-encoded bodies
app.use(express.json()); //parse JSON bodies
app.use(cookieParser());
// app.use('/posts', postRoutes);

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

app.post('/api/profile', function(req, res)  {
  const { Email } = req.body;
  console.log("sdjfn: " + Email);
  const profile = new Profile({ Email });
  profile.save(function(err) {
      if(err) {
          console.log(err);
      } else{
          res.status(200).send("You are registered!");
      }
  });
});

app.get('/checkToken', withAuth, function(req, res) {
    res.sendStatus(200);
  });

app.get('/api/profile/email/:email', (req, res) => {
    const Email = req.params.email;
    Profile.findOne ({Email})
      .then(data => {
          res.send(data);
      })
      .catch( e => {console.log(e)}
      )
});

app.get('/profiles', (req , res) => {
    Profile.find ({}, {_id: 0, Email: 1, Games: 1})
        .then(data => {
            res.send(data);
        })
        .catch(e => {
            console.log(e);
        })
});
   

mongoose.set('useFindAndModify', false);

app.put('/profile/:email', (req, res) => {
    const Email = req.params.email;
    Profile.findOneAndUpdate({Email: Email}, req.body, (err, docs) => {
      if (err){
          console.log(err)
      }
      else{
          console.log("Updated User : ", docs);
      }
  });
});

app.post('/api/authenticate', function(req, res) {
    const { email, password } = req.body;
    User.findOne({ email }, function(err, user) {
      if (err) {
        console.error(err);
        res.status(500)
          .json({
          error: 'Internal error please try again'
        });
      } else if (!user) {
        res.status(401)
          .json({
            error: 'Incorrect email or password'
          });
      } else {
        user.isCorrectPassword(password, function(err, same) {
          if (err) {
            res.status(500)
              .json({
                error: 'Internal error please try again'
            });
          } else if (!same) {
            res.status(401)
              .json({
                error: 'Incorrect email or password'
            });
          } else {
            // Issue token
            const payload = { email };
            const token = jwt.sign(payload, secret, {
              expiresIn: '1h'
            });
            res.cookie('token', token, { httpOnly: true })
              .sendStatus(200);
          }
        });
      }
    });
  });


app.listen(8080, function() {
    console.log("Server is running on Port: 8080");
  });