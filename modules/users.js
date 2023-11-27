// users.js
const apiUrl = 'https://busy-erin-sneakers.cyclic.app/';

document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
});

async function fetchUsers() {
    try {
        const response = await fetch(apiUrl + 'users');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayUsers(users) {
    const usersList = document.getElementById('usersList');
    usersList.innerHTML = '';

    users.forEach(user => {
        const userItem = document.createElement('tr');
        userItem.innerHTML = `
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="editUser('${user._id}')">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteUser('${user._id}')">Delete</button>
            </td>
        `;
        usersList.appendChild(userItem);
    });
}

function editUser(userId) {
    // Add logic to edit user
    console.log('Edit user with ID:', userId);
    // Change button to 'Save' and disable 'Delete' button
}

async function deleteUser(userId) {
    try {
        const response = await fetch(apiUrl + 'users/' + userId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // Add any necessary headers such as authentication tokens here
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        console.log('User deleted with ID:', userId);
        fetchUsers(); // Refresh the list of users after deletion
    } catch (error) {
        console.error('Error:', error);
    }
}

