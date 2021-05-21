import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './Home'
import News from './News'
import BrowseGames from './BrowseGames'
import login from './Login-Signup/login'
import Profile from './Profile'
/*
TO DO:
import other webpages
*/


const Webpages = () => {
    return(
        //To Do: Add path to other pages 
        <Router>
            <Route exact path="/" component = {Home} /> 
            <Route path="/news" component = {News} />
            <Route path="/browse-games" component = {BrowseGames} />
            <Route path='/Login-Signup' component = {login} />
            <Route path='/profile' component = {Profile}/>
        </Router>
    );
};

export default Webpages;