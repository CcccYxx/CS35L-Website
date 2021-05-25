import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

class Login extends Component{ 

    constructor(props) {
        super(props);
        this.state = {
            isLoginVisible: true,
            email:'',
            password:'',
        };
    }

    toggleLogin = () => {
        this.setState(prevState => ({
            isLoginVisible: !prevState.isLoginVisible,
          }));
    };

    onSubmitLogin = (event) => {
        event.preventDefault();
        fetch('http://localhost:8080/api/register', {
            method: 'POST', 
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    onInputChange = (event) =>{
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    render(){
    return(
        <div class="container">
        {/*Login form */}
        <form className={`form${this.state.isLoginVisible ? "" : "Hidden"}`} id="login" onSubmit={this.onSubmitLogin}>
            <h1 class="formTitle">Login</h1>
            <div class="formInput">
                <input type="email" class="formInput" autofocus placeholder="Email" onChange={this.onInputChange} />
                <input type="password" class="formInput" autofocus placeholder="Password" onChange={this.onInputChange} required /> 
            </div>
            <button class="formContinue" type="submit">Continue</button>
            <p class="formExtra"> 
                <Link to='/Login-Signup/login.js' onClick={this.toggleLogin} class="formLink" id="linkCreateAccount">Don't have an account? Create account</Link>
            </p>
        </form>
        {/*Signup form*/}
        <form className={`form${this.state.isLoginVisible ? "Hidden" : ""}`}id="signup">
            <h1 class="formTitle">Create Account</h1>
            <div class="formInput">
                <input type="email" class="formInput" autofocus placeholder="Email" onChange={this.onInputChange} required />
                <input type="password" class="formInput" autofocus placeholder="Password" required />
                <input type="password" class="formInput" autofocus placeholder="Confirm Password" required />
            </div>
            <button class="formContinue" type="submit">Continue</button>
            <p class="formExtra"> 
                <a href='#login' class="formLink"  onClick={this.toggleLogin} id="linkLogin">Already have an account? Login</a>
            </p>
        </form>
        </div>
    );
    }
};
export default Login;
