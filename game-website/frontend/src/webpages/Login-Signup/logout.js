import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
class Logout extends Component{ 
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.handleLogout();
    }
    render() {
        return(
            <button onClick={this.handleClick}>Click to Logout</button>
        )
    }
}

export default Logout;