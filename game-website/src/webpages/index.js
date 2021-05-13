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
import Signin from './Signin'
import Signup from './Signup'
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
            <Route path='/sign-in' component = {Signin} />
            <Route path='/sign-up' component = {Signup} />
        </Router>
    );
};

export default Webpages;