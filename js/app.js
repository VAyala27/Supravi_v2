// REGISTRATION
const firstname = document.querySelector('#firstname');
const lastname = document.querySelector('#lastname');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');
const registerBtn = document.querySelector('#register');

registerBtn.addEventListener('click', () => {
    var regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regx.test(email.value)) {
        let error = document.getElementsByClassName('text-danger')[2];
        error.textContent = "";
    } else {
        let error = document.getElementsByClassName('text-danger')[2];
        error.textContent = "You have entered an invalid email address!";
    }

    if (password2 !== password) {
        let error = document.getElementsByClassName('text-danger')[4];
        error.textContent = "Passwords don't match";
    } else {
        let error = document.getElementsByClassName('text-danger')[4];
        error.textContent = "";
    }

    emptyValidation(firstname, 0, "Please provide a first name");
    emptyValidation(lastname, 1, "Please provide a last name");
    emptyValidation(email, 2, "Please provide an email");
    emptyValidation(password, 3, "Please provide a password");
    emptyValidation(password2, 4, "Please provide another password");
});

// // LOGIN
// const loginEmail = document.querySelector('#loginEmail');
// const loginPassword = document.querySelector('#loginPassword');
// const loginBtn = document.querySelector('#loginBtn');

// loginBtn.addEventListener('click', () => {
//     emptyValidation(loginEmail, 0, "Please Enter your email");
//     emptyValidation(loginPassword, 1, "Please enter your password");
// });

function emptyValidation(inputField, index, text) {
    if (inputField.value === "") {
        let error = document.getElementsByClassName('text-danger')[index];
        error.textContent = text;
    } else {
        let error = document.getElementsByClassName('text-danger')[index];
        error.textContent = "";
    }
}