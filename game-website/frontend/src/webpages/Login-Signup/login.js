import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';

class Login extends Component{ 

    constructor(props) {
        super(props);
        this.state = {
            isLoginVisible: true,
            email:'',
            password:''
        };

        this.onSubmitLogin = this.onSubmitLogin.bind(this);
    }

    toggleLogin = () => {
        this.setState(prevState => ({
            isLoginVisible: !prevState.isLoginVisible,
          }));
    };

    onSubmitLogin = (event) => {
        event.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/api/authenticate', user)
        .then(response => {
            this.props.handleLogin();
            alert('Successfully Logged In');
            this.props.history.push('/');
            sessionStorage.setItem("isloggedin", "true");
            window.location.reload(false);
        })
        .catch(error => {
            alert('Incorrect Email/Password');
        });
    }

    onSubmitRegister = (event) => {
        event.preventDefault();
        const newUser = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/api/register', newUser)
        .then((response) => {
                alert('Successfully registered. Please Login')
        }, (error) => {
            alert('Failure registrating: email already in use')
        });
    

    }

    onEmailChange = (event) =>{
        this.setState({
            email: event.target.value
        });
    }

    onPasswordChange = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    render(){
    return( 
        <div class="container">
        {/*Login form */}
        <form className={`form${this.state.isLoginVisible ? "" : "Hidden"}`} id="login" onSubmit={this.onSubmitLogin}>
            <h1 className="formTitle">Login</h1>
            <div className="formInput">
                <input type="email" className="formInput" placeholder="Email" onChange={this.onEmailChange} required/>
                <input type="password" className="formInput" placeholder="Password" onChange={this.onPasswordChange} required /> 
            </div>
            <button className="formContinue" type="submit">Continue</button>
            <p className="formExtra"> 
                <Link to='/Login-Signup/login.js' onClick={this.toggleLogin} class="formLink" id="linkCreateAccount">Don't have an account? Create account</Link>
            </p>
        </form>
        {/*Signup form*/}
        <form className={`form${this.state.isLoginVisible ? "Hidden" : ""}`}id="signup" onSubmit={this.onSubmitRegister}>
            <h1 className="formTitle">Create Account</h1>
            <div className="formInput">
                <input type="email" className="formInput" placeholder="Email" onChange={this.onEmailChange} required />
                <input type="password" className="formInput" placeholder="Password" onChange={this.onPasswordChange} required />
            </div>
            <button className="formContinue" type="submit">Continue</button>
            <p className="formExtra"> 
                <Link to='/Login-Signup/login.js' className="formLink"  onClick={this.toggleLogin} id="linkLogin">Already have an account? Login</Link>
            </p>
        </form>
        </div>
    );
    }
};

export default Login;
