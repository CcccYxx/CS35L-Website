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
        <div className="container">
        {/*Login form */}
        <form className={`form${this.state.isLoginVisible ? "" : "Hidden"}`} id="login" onSubmit={this.onSubmitLogin}>
            <h1 className="formTitle">Login</h1>
            <div className="formInput">
                <input type="email" className="formInput" autofocus placeholder="Email" onChange={this.onInputChange} />
                <input type="password" className="formInput" autofocus placeholder="Password" onChange={this.onInputChange} required /> 
            </div>
            <button className="formContinue" type="submit">Continue</button>
            <p className="formExtra"> 
                <Link to='/Login-Signup/login.js' onClick={this.toggleLogin} className="formLink" id="linkCreateAccount">Don't have an account? Create account</Link>
            </p>
        </form>
        {/*Signup form*/}
        <form className={`form${this.state.isLoginVisible ? "Hidden" : ""}`}id="signup">
            <h1 className="formTitle">Create Account</h1>
            <div className="formInput">
                <input type="email" className="formInput" autofocus placeholder="Email" onChange={this.onInputChange} required />
                <input type="password" className="formInput" autofocus placeholder="Password" required />
                <input type="password" className="formInput" autofocus placeholder="Confirm Password" required />
            </div>
            <button className="formContinue" type="submit">Continue</button>
            <p className="formExtra"> 
                <a href='#login' className="formLink"  onClick={this.toggleLogin} id="linkLogin">Already have an account? Login</a>
            </p>
        </form>
        </div>
    );
    }
};
export default Login;
