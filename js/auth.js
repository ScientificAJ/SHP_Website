/*
 * Authentication logic for Student HackPad 2026.
 *
 * This module provides functions for sign‑up, login and session management
 * using the browser's localStorage.  In a production environment you
 * would replace this with proper backend authentication.
 */

// Get users from localStorage or return empty array
function getUsers() {
  const users = localStorage.getItem('shp_users');
  return users ? JSON.parse(users) : [];
}

// Save users to localStorage
function saveUsers(users) {
  localStorage.setItem('shp_users', JSON.stringify(users));
}

// Sign up a new user
function signUp(event) {
  event.preventDefault();
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  if (!name || !email || !password) {
    alert('Please fill in all fields.');
    return;
  }
  const users = getUsers();
  const existing = users.find(u => u.email === email);
  if (existing) {
    alert('A user with this email already exists.');
    return;
  }
  const newUser = { name, email, password };
  users.push(newUser);
  saveUsers(users);
  alert('Sign up successful!  You can now log in.');
  window.location.href = 'login.html';
}

// Log in a user
function logIn(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    alert('Invalid email or password.');
    return;
  }
  localStorage.setItem('shp_current_user', JSON.stringify(user));
  // After successful login, redirect back to the page that triggered
  // authentication if a redirect parameter is present.  Otherwise go home.
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get('redirect');
  if (redirect) {
    window.location.href = redirect;
  } else {
    window.location.href = 'index.html';
  }
}

// Log out current user
function logOut() {
  localStorage.removeItem('shp_current_user');
  window.location.href = 'index.html';
}

// Retrieve the currently logged in user object, or null if not logged in
function getLoggedInUser() {
  const user = localStorage.getItem('shp_current_user');
  return user ? JSON.parse(user) : null;
}

// Require a login for pages that should be protected.  If no user is logged in
// the visitor is redirected to the login page.  An optional redirect
// parameter is appended so the user can be sent back after logging in.
function requireLogin() {
  const user = getLoggedInUser();
  if (!user) {
    const current = window.location.pathname.split('/').pop();
    window.location.href = `login.html?redirect=${encodeURIComponent(current)}`;
  }
}
// Check if a user is logged in and update nav bar
function updateNavAuth() {
  const user = localStorage.getItem('shp_current_user');
  const authContainer = document.getElementById('auth-container');
  if (user) {
    const userObj = JSON.parse(user);
    authContainer.innerHTML = `<span>Welcome, ${userObj.name}</span> <a href="#" onclick="logOut()">Log out</a>`;
  } else {
    authContainer.innerHTML = `<a href="login.html" class="login">Log in</a><a href="signup.html" class="signup">Sign up</a>`;
  }
}

// Call updateNavAuth on page load for pages that include the nav
window.addEventListener('DOMContentLoaded', () => {
  const authContainer = document.getElementById('auth-container');
  if (authContainer) {
    updateNavAuth();
  }
});
