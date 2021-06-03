import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
class Logout extends Component{ 
    componentDidMount() {
        this.props.handleLogout();
        window.location.reload(false)
    }
    render() {
        return(
           <Redirect to='/'></Redirect>
        )
    }
}

export default Logout;