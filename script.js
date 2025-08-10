function Redirect(){
    window.location.href = "components/homepage.html"
}

document.addEventListener("DOMContentLoaded", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
        showProfile(currentUser.username);
    }
});


function register() {
    const username = document.getElementById("register-username").value.trim();
    const password = document.getElementById("register-password").value.trim();

    if (!username || !password) {
        alert("Please fill all fields.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(user => user.username === username)) {
        alert("Username already taken.");
        return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! You can now login.");
}

function login() {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(user => user.username === username && user.password === password);

    if (!foundUser) {
        alert("Invalid credentials.");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    showProfile(username);
}

function showProfile(username) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("register-section").style.display = "none";
    document.getElementById("profile-section").style.display = "block";
    document.getElementById("profile-username").innerText = username;
}

function updateProfile() {
    const newUsername = document.getElementById("profile-new-username").value.trim();
    if (!newUsername) {
        alert("Please enter a new username.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (users.find(user => user.username === newUsername)) {
        alert("Username already exists.");
        return;
    }

    users = users.map(user => {
        if (user.username === currentUser.username) {
            return { ...user, username: newUsername };
        }
        return user;
    });

    currentUser.username = newUsername;

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    document.getElementById("profile-username").innerText = newUsername;
    alert("Profile updated!");
}

// Logout
function logout() {
    localStorage.removeItem("currentUser");
    location.reload();
}
