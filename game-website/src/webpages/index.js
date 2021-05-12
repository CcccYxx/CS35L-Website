import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './Home'
/*
TO DO:
import other webpages
*/

const Webpages = () => {
    return(
        //To Do: Add path to other pages 
        <Router>
            <Route exact path="/" component = {Home} /> 
        </Router>
    );
};

export default Webpages;