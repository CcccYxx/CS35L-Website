import React, { Component } from 'react';
import { MenuItems } from "./MenuItems";
import './NavBar.css';

class NavBar extends Component{
    render() {
        return(
            <nav className="NavBarItems">
                <h1 className="app-logo"> <a href='/' className="site-name">Game-Website</a> </h1>
                <ul className="nav-menu">
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                   {item.label}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        );
    };
};

export default NavBar
