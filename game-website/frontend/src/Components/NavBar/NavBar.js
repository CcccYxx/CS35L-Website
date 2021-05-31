import React, { Component } from 'react';
import { MenuItems } from "./MenuItems";
import './NavBar.css';

class NavBar extends Component{
    render() {
        if(sessionStorage.getItem("isloggedin")){
            return(
                <nav className="NavBarItems">
                    <h1 className="app-logo"> <a href='/' className="site-name">Game-Website</a> </h1>
                    <ul className="nav-menu">
                        {MenuItems.map((item, index) => {
                            return (
                                <li key={index}>
                                    <a className={item.label === 'Sign in' ? "nav-links-noshow" : item.cName} href={item.url}>
                                    {item.label}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            );
        } else{
            return(
                <nav className="NavBarItems">
                    <h1 className="app-logo"> <a href='/' className="site-name">Game-Website</a> </h1>
                    <ul className="nav-menu">
                        {MenuItems.map((item, index) => {
                            return (
                                <li key={index}>
                                    <a className={item.label === 'Logout' || item.label === 'Profile'? "nav-links-noshow": item.cName} href={item.url}>
                                    {item.label}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            );
        }
    };
};

export default NavBar
