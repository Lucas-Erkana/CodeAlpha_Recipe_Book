require('dotenv').config();

// users.js
const apiUrl = process.env.API_URL;

document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Fetch values
    const username = document.getElementById('newUsername').value;
    const email = document.getElementById('newEmail').value;
    const password = document.getElementById('newPassword').value;
    const role = "user";

    //validating form
    function validateForm(email, password) {
        let valid = true;
    
        if (!email.includes('@')) {
            showError('emailError', 'Invalid email');
            valid = false;
        }
        if (password.length < 7) {
            showError('passwordError', 'Password must be at least 7 characters');
            valid = false;
        }
    
        return valid;
    }
    

    // Validate data
    if (!validateForm(email, password)) {
        return; // Stop the function if validation fails
    }

    try {
        // Post data
        const response = await fetch(apiUrl + 'users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "username":username, "email": email, "role":role, "password":password })
        });
    
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
    
        // Handling response as text
        const data = await response.text();
        console.log("Response received: ", data);
        
        // Hide signup form and show success message
        hideElement('signUpCard');
        hideElement ('signInCard')                                                        
        showSuccessMessage(email);
        setTimeout(() => {
            hideElement('successMessage');
            showElement('signInCard');
        }, 3000);
    
    } catch (error) {
        console.error('Error:', error);
    }
    
});

function showSuccessMessage(email) {
    const messageElement = document.getElementById('successMessage');
    messageElement.textContent = `User saved with email: ${email}`;
    messageElement.style.display = 'block';
}

function hideElement(elementId) {
    const element = document.getElementById(elementId);
    element.style.display = 'none';
}

function showElement(elementId) {
    const element = document.getElementById(elementId);
    element.style.display = 'block';
}
