import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Home'
import News from './News'
import BrowseGames from './BrowseGames'
import Login from './Login-Signup/login'
import Profile from './Profile'
<<<<<<< HEAD
import Forum from './Forum'

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
            <Route path='/forum' component = {Forum} />
        </Router>
    );
=======
import Logout from './Login-Signup/logout'

class Webpages extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoggedIn: false
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    checkLoginStatus() {
        let data = sessionStorage.getItem("isloggedin");
        if(
            data === "true" &&
            !this.state.isLoggedIn
        ) {
            this.setState({
                isLoggedIn: true
            });
        } else if(
            data !== "true" &&
            this.state.isLoggedIn
        ) {
            this.setState({
                isLoggedIn: false
            });
        }
    }

    componentDidMount() {
        this.checkLoginStatus();
    }

    handleLogin() {
        this.setState({
            isLoggedIn: true
        });
    }

    handleLogout() {
        this.setState({
            isLoggedIn: false
        });
        sessionStorage.removeItem("isloggedin");
    }

    render() {
        if(this.state.isLoggedIn){
            return(
                
                <Router>
                    <Switch>
                        <Route exact path="/" component = {Home} /> 
                        <Route path="/news" component = {News} />
                        <Route path="/browse-games" component = {BrowseGames} />
                        <Route path="/logout"
                          render={props => (
                            <Logout
                            {...props}
                            handleLogout={this.handleLogout}
                            />
                        )}/>
                        <Route path='/profile' 
                        // component = {Profile} 
                            render={props => (
                                <Profile
                                {...props}
                                isLoggedIn={this.state.isLoggedIn}
                                />
                            )}
                        />
                    </Switch>
                </Router>
            );
        } else {
            return(
                
                <Router>
                    <Switch>
                        <Route exact path="/" component = {Home} /> 
                        <Route path="/news" component = {News} />
                        <Route path="/browse-games" component = {BrowseGames} />
                        <Route path='/Login-Signup' 
                        // component = {Login} 
                            render={(props) => (
                                <Login {...props}
                                handleLogin={this.handleLogin}
                                isLoggedIn={this.state.isLoggedIn}
                                />
                            )}
                        />
                    </Switch>
                </Router>
            );
        }
}
>>>>>>> backend
};

export default Webpages;