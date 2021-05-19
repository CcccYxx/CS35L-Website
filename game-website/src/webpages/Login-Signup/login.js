document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const signupForm = document.querySelector("#signup");

    /*Hide Signup form when login link clicked */
    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("formHidden");
        signupForm.classList.remove("formHidden");
    });

   //Hide login form when signup link clicked 
    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("formHidden");
        signupForm.classList.add("formHidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        //Fetch login here 

    });

    signupForm.addEventListener("submit", e => {
        e.preventDefault();

        //Push login here
    })

}); 
