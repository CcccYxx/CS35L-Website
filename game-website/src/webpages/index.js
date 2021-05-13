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
        </Router>
    );
};

export default Webpages;