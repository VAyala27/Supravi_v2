// LOGIN
const loginEmail = document.querySelector('#loginEmail');
const loginPassword = document.querySelector('#loginPassword');
const loginBtn = document.querySelector('#loginBtn');

loginBtn.addEventListener('click', () => {
    emptyValidation(loginEmail, 0, "Please enter your email");
    emptyValidation(loginPassword, 1, "Please enter your password");
});

function emptyValidation(inputField, index, text) {
    if (inputField.value === "") {
        let error = document.getElementsByClassName('text-danger')[index];
        error.textContent = text;
    } else {
        let error = document.getElementsByClassName('text-danger')[index];
        error.textContent = "";
    }
}