import React from 'react';
import './login.css';

const Login = () =>{ 
    return(
        <div class="container">
        {/*Login form */}
        <form class="form" id="login">
            <h1 class="formTitle">Login</h1>
            <div class="formInput">
                <input type="email" class="formInput" autofocus placeholder="Email" required />
                <input type="password" class="formInput" autofocus placeholder="Password" required /> 
            </div>
            <button class="formContinue" type="submit">Continue</button>
            <p class="formExtra"> 
                <a class="formLink"  href="./" id="linkCreateAccount">Don't have an account? Create account</a>
            </p>
        </form>
        {/*Signup form*/}
        <form class="form formHidden" id="signup">
            <h1 class="formTitle">Create Account</h1>
            <div class="formInput">
                <input type="email" class="formInput" autofocus placeholder="Email" required />
                <input type="password" class="formInput" autofocus placeholder="Password" required />
                <input type="password" class="formInput" autofocus placeholder="Confirm Password" required />
            </div>
            <button class="formContinue" type="submit">Continue</button>
            <p class="formExtra"> 
                <a class="formLink"  href="./" id="linkLogin">Already have an account? Login</a>
            </p>
        </form>
        </div>
    );
};
export default Login;
/* // document.addEventListener("DOMContentLoaded", () => {
//     const loginForm = document.querySelector("#login");
//     const signupForm = document.querySelector("#signup");

//     /*Hide Signup form when login link clicked */
//     document.querySelector("#linkCreateAccount").addEventListener("click", e => {
//         e.preventDefault();
//         loginForm.classList.add("formHidden");
//         signupForm.classList.remove("formHidden");ls
//     });

//    //Hide login form when signup link clicked 
//     document.querySelector("#linkLogin").addEventListener("click", e => {
//         e.preventDefault();
//         loginForm.classList.remove("formHidden");
//         signupForm.classList.add("formHidden");
//     });

//     loginForm.addEventListener("submit", e => {
//         e.preventDefault();

//         //Fetch login here 

//     });

//     signupForm.addEventListener("submit", e => {
//         e.preventDefault();

//         //Push login here
//     })

// }); 
// }; */}