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
        fetch('/api/authenticate', {
            method: 'POST', 
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status === 200) {
                this.props.history.push('/');
                alert('succesfully logged in');
            } else {
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch(err => {
            console.error(err);
            alert('Error logging in please try again');
        });
    }

    onSubmitRegister = (event) => {
        event.preventDefault();
        
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
            <h1 className="formTitle">Login</h1>
            <div className="formInput">
                <input type="email" className="formInput" placeholder="Email" onChange={this.onInputChange} value={this.state.email} required/>
                <input type="password" className="formInput" placeholder="Password" onChange={this.onInputChange} value={this.state.password} required /> 
            </div>
            <button className="formContinue" type="submit">Continue</button>
            <p className="formExtra"> 
                <Link to='/Login-Signup/login.js' onClick={this.toggleLogin} class="formLink" id="linkCreateAccount">Don't have an account? Create account</Link>
            </p>
        </form>
        {/*Signup form*/}
        <form className={`form${this.state.isLoginVisible ? "Hidden" : ""}`}id="signup" >
            <h1 className="formTitle">Create Account</h1>
            <div className="formInput">
                <input type="email" className="formInput" placeholder="Email" required />
                <input type="password" className="formInput" placeholder="Password" required />
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
