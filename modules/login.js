const apiUrl ='https://busy-erin-sneakers.cyclic.app/'

// Function to display an error message and hide it after a specified time
function displayErrorMessage(message) {
  const errorMessageElement = document.getElementById("errorMessage");
  errorMessageElement.textContent = message;
  errorMessageElement.style.display = "block";

  setTimeout(function () {
    errorMessageElement.style.display = "none";
  }, 2000); // 2000 milliseconds (2 seconds)
}

document.addEventListener("DOMContentLoaded", () => {
  const signInForm = document.getElementById("signinForm");
  signInForm.addEventListener("submit", handleSignIn);

  const logoutButton = document.querySelector("#logoutButton"); // Ensure this selector matches your logout button's ID or class
  if (logoutButton) {
    logoutButton.addEventListener("click", handleLogout);
  }
});

async function handleSignIn(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const user = await authenticateUser(username, password);
    if (user) {
      localStorage.setItem("username", user.username);
      displayNavigationAndRecipe();
      document.querySelector(".login").style.display = "none";
      updateNavBarWithUsername(user.username);
    } else {
      displayErrorMessage("Invalid username or password.");
    }
  } catch (error) {
    displayErrorMessage("An error occurred. Please try again later.");
  }
}

async function authenticateUser(username, password) {
  try {
    const response = await fetch(apiUrl + "users");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const users = await response.json();
    return users.find(
      (user) => user.username === username && user.password === password
    );
  } catch (error) {
    console.error("Error during fetching users:", error);
    throw error;
  }
}

function displayNavigationAndRecipe() {
  document.querySelector("nav").style.display = "block";
  document.querySelector(".Recipe").style.display = "block";
}

function updateNavBarWithUsername(username) {
  const logoutNavItem = document.querySelector(".navbar-nav").lastElementChild;

  // Remove existing username element if present
  const existingUsernameElement = logoutNavItem.querySelector(".username");
  if (existingUsernameElement) {
    logoutNavItem.removeChild(existingUsernameElement);
  }

  // Add new username element
  const usernameElement = document.createElement("span");
  usernameElement.className = "username"; // Add a class for easy identification
  usernameElement.textContent = username;
  logoutNavItem.insertBefore(usernameElement, logoutNavItem.firstChild);
}

function handleLogout() {
  // Clear local storage
  localStorage.removeItem("username");

  // Remove username from nav bar
  const logoutNavItem = document.querySelector(".navbar-nav").lastElementChild;
  const existingUsernameElement = logoutNavItem.querySelector(".username");
  if (existingUsernameElement) {
    logoutNavItem.removeChild(existingUsernameElement);
  }

  // Hide navigation and recipe sections
  document.querySelector("nav").style.display = "none";
  document.querySelector(".Recipe").style.display = "none";

  // Display the login section
  document.querySelector(".login").style.display = "block";
}

document.getElementById("username").addEventListener("focus", function (event) {
  event.target.value = "";
});

document.getElementById("password").addEventListener("focus", function (event) {
  event.target.value = "";
});
