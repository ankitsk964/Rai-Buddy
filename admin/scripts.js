// Function to initialize user data from localStorage
function initializeUserData() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users;
}

// Function to render users in the table
function renderUsers() {
    const users = initializeUserData();
    const userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = '';

    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
                <button class="action-button" onclick="deleteUser(${index})">Delete</button>
            </td>
        `;
        userTableBody.appendChild(row);
    });
}

// Function to add a new user
function addUser() {
    const username = document.getElementById('newUsername').value;
    const email = document.getElementById('newEmail').value;
    const password = document.getElementById('newPassword').value;
    const role = document.getElementById('newRole').value;

    if (username && email && password) {
        const users = initializeUserData();
        users.push({ username, email, password, role });
        localStorage.setItem('users', JSON.stringify(users));
        renderUsers();
        alert("User added successfully!");
        toggleAddUserForm(); // Hide the form after adding
    } else {
        alert('Please fill in all fields.');
    }
}

// Function to delete a user
function deleteUser(index) {
    const users = initializeUserData();
    users.splice(index, 1); // Remove user by index
    localStorage.setItem('users', JSON.stringify(users));
    renderUsers(); // Re-render user table after deletion
    alert("User deleted successfully!");
}

// Function to toggle the visibility of the Add User form
function toggleAddUserForm() {
    const form = document.getElementById('addUserForm');
    form.style.display = form.style.display === 'none' || form.style.display === '' ? 'block' : 'none';
}

// Initialize and render users on page load
window.onload = function() {
    renderUsers();
};
