const apiUrl = 'https://rich-bat-bathing-suit.cyclic.app/';

document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Fetch values
    const username = document.getElementById('newUsername').value;
    const email = document.getElementById('newEmail').value;
    const password = document.getElementById('newPassword').value;
    const role = "user";

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

        const data = await response.json();
        console.log(data);
        // Handle successful response here

    } catch (error) {
        console.error('Error:', error);
    }
});

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

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 3000);
}
