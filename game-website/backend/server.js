const express = require("express");
const mongoose = require('mongoose');
const postMessage = require("./models/postMessage");
const Profile = require("./models/profile");
const User = require("./user"); 
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const withAuth = require('./middleware/middleware');
const { request } = require("express");
const uri = "mongodb+srv://Gamewebsite:WqvWDOvAEHUPfevX@cluster0.h0txi.mongodb.net/UserInformation?retryWrites=true&w=majority";
// import postRoutes from './posts';
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('7b0f61af707f4a5cadb73a86aa2a2864');
//const igdb = require('igdb-api-node');
//const fetch = require('node-fetch');
const apicalypse = require('apicalypse');
//move token to .env file
const secret = "website-secret-string"
const axios = require('axios');

//Middleware
app.use(express.urlencoded({ extended: false })); //parse URL-encoded bodies
app.use(express.json({limit:'50mb'}));//parse JSON bodies
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

app.get('/api/profile/:id', (req, res) => {
    const id = req.params.id;
    Profile.findById (id)
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(
            console.log("error")
        )
  });

  app.get('/api/profile/email/:email', (req, res) => {
    const Email = req.params.email;
    Profile.findOne ({Email})
      .then(data => {
          console.log(data);
          res.send(data);
      })
      .catch( 
          console.log("e")
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
    Profile.findOneAndUpdate({Email}, req.body, (err, docs) => {
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


app.post('/forum/post', (req, res) => {
    const newPostMessage = new postMessage({
        title: req.body.title,
        message: req.body.message,
        creator: req.body.creator,
        tags: req.body.tags,
        selectedFile: req.body.selectedFile
    })
    newPostMessage
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST request to /forum",
                createdPost: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
})

app.get('/forum/get', async (req, res) => {
    try{
        const posts = await postMessage.find();
        if(posts.length >= 0){
            res.status(200).json(posts);
        }else{
            res.status(204).json({message: "No valid entry found"})
        }
    }catch(err){
        res.status(404).json({message: err.message});
    }
})

app.patch('/forum/patch/likeCount', (req, res) => {
    const id = req.body._id;
    postMessage.update({_id: id}, {$set:{likeCount: req.body.likeCount+1}})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
})

app.delete('/del/:id', (req, res) => {
    const id = req.params.id;
    postMessage.remove({_id: id})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
})


app.get('/search/user/:searchString', async (req, res) => {
    const searchString = req.params.searchString;
    const projection = {
        _id: 1,
        Games: 1,
        Name: 1,
        image: 1,
        Friendids: 0,
        Friends: 0,
        Email: 0,
    }
    try{
        const users = await Profile.find({$or: [
            {Games: new RegExp('.*' + searchString + '.*', 'i')}, 
            {Name: new RegExp('.*' + searchString + '.*', 'i')},
            {bio: new RegExp('.*' + searchString + '.*', 'i')}, 
            {Email: searchString}, {id: searchString}
        ]}).limit(20)
        if (users.length > 0){
            console.log(users);
            res.status(200).json(users);
        }else{
            console.log("No users found");
            res.status(204).json({message: "No valid user found"});
        }
    }catch(err){
        res.status(404).json({error: err})
    }
})

app.get('/search/post/:searchString', async (req, res) => {
    const searchString = req.params.searchString;
    try{
        const posts = await postMessage.find({$or: [
            {creator: new RegExp('.*' + searchString + '.*', 'i')},
            {title: new RegExp('.*' + searchString + '.*', 'i')},
            {tags: new RegExp('.*' + searchString + '.*', 'i')},
            {message: new RegExp('.*' + searchString + '.*', 'i')},
        ]}).limit(20)
        if(posts.length > 0){
            console.log(posts);
            res.status(200).json(posts);
        }else{
            console.log("No posts found");
            res.status(204).json({message: "No relevant posts found"})
        }
    }catch(err){
        res.status(404).json({error: err});
    }
})

app.get('/news_api', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    newsapi.v2.everything({
        q: 'gaming',
        from: '2021-05-06',
        ln: 'en',
	sortBy: "popularity"
    }).then(response => {
        console.log(response);
	res.send(response);
	return;
    })
})

app.options('/*', function (req, res) {
    console.log("OPTIONS");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.send();
    res.status(200);
});

app.get('/get_token', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    const tokenAddress = 'https://id.twitch.tv/oauth2/token?client_id=qs2mp7bzre7yc6nbltzqhjzdjia4qz&client_secret=x21nh5m6aq45u5znk3bm9oxj6re7gp&grant_type=client_credentials';
    return axios.post(tokenAddress, {})
	.then(response => res.send(response.data.access_token));
});

app.post('/browse_database', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    const bearer = 'Bearer ' + req.body.token;          // Use this instead to get a new token every time
    const authenticationInfo = {
        'Client-ID': 'qs2mp7bzre7yc6nbltzqhjzdjia4qz',
        'Authorization': bearer
    };
    const dataAddress = 'https://api.igdb.com/v4/games';
    axios({
      url: dataAddress,
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Client-ID': 'qs2mp7bzre7yc6nbltzqhjzdjia4qz',
          'Authorization': bearer,
      },
      data: req.body.query
    })
    .then(response2 => {
	res.status(200)
	res.send(response2.data);
    })
    .catch(err => {
	res.status(500);
	res.send("FAILURE");
    });
})

app.post('/get_covers', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    const bearer = 'Bearer ' + req.body.token;          // Use this instead to get a new token every time
    const authenticationInfo = {
        'Client-ID': 'qs2mp7bzre7yc6nbltzqhjzdjia4qz',
        'Authorization': bearer
    };
    const dataAddress = 'https://api.igdb.com/v4/covers';
    axios({
      url: dataAddress,
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Client-ID': 'qs2mp7bzre7yc6nbltzqhjzdjia4qz',
          'Authorization': bearer,
      },
      data: req.body.query
    })
    .then(response => {
	res.status(200)
	res.send(response.data);
    })
    .catch(err => {
	res.status(500);
	res.send("FAILURE");
    });
});

app.listen(8080, function() {
    console.log("Server is running on Port: 8080");
});
