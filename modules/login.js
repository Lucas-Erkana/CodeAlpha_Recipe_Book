// login.js

const apiUrl = 'https://rich-bat-bathing-suit.cyclic.app/';

document.addEventListener('DOMContentLoaded', () => {
    const signInForm = document.getElementById('signinForm');
    signInForm.addEventListener('submit', handleSignIn);
});

async function handleSignIn(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await authenticateUser(username, password);
        if (response.success) {
            localStorage.setItem('username', response.username);
            displayNavigationAndRecipe();
            document.querySelector('.login').style.display = 'none';
            updateNavBarWithUsername(response.username);
        } else {
            displayErrorMessage('Invalid username or password.');
        }
    } catch (error) {
        displayErrorMessage('An error occurred. Please try again later.');
    }
}

async function authenticateUser(username, password) {
    try {
        const response = await fetch(apiUrl + 'users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "username":username,"password":password  })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error during authentication:', error);
        throw error;
    }
}

function displayNavigationAndRecipe() {
    document.querySelector('nav').style.display = 'block';
    document.querySelector('.Recipe').style.display = 'block';
}

function updateNavBarWithUsername(username) {
    const logoutNavItem = document.querySelector('.navbar-nav').lastElementChild;
    const usernameElement = document.createElement('span');
    usernameElement.textContent = username;
    logoutNavItem.insertBefore(usernameElement, logoutNavItem.firstChild);
}

function displayErrorMessage(message) {
    const errorMessageElement = document.getElementById('successMessage');
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = 'block';
}
