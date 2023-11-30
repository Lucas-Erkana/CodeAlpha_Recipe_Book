import { viewSingleRecipe, displayRecipe,toggler } from "./viewsingle.js";
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
  fetchAndDisplayRecipes(); // Fetch and display recipes
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
//fetch Display for Recipes
async function fetchAndDisplayRecipes() {
  try {
    const response = await fetch(apiUrl + 'recipes');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const recipes = await response.json();
    displayRecipes(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
}

function displayRecipes(recipes) {
  const container = document.getElementById("recipesContainer");
  container.innerHTML = ""; // Clear existing content
  const itemsPerRow = 4; // Define the number of items per row
  // Create rows to group the items
  let currentRow;
  for (let i = 0; i < recipes.length; i++) {
    if (i % itemsPerRow === 0) {
      currentRow = document.createElement("div");
      currentRow.className = "row";
      container.appendChild(currentRow);
    }
    const recipe = recipes[i]; // Correctly define the recipe variable here
    const card = document.createElement("div");
    card.className = "col-md-3 main-content";
    card.innerHTML = `
    <div class="card h-100 mb-3 main-content">
    <img src="${recipe.images[0]}" class="card-img-top recipe-image" alt="${recipe.title}">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">${recipe.title}</h5>
      <p class="card-text">${recipe.description}</p>
      <p class="card-text"><small class="text-muted">Prep Time: ${recipe.prepTime} mins | Cook Time: ${recipe.cookTime} mins</small></p>
      <div class="mt-auto">
      <button class="btn btn-success" data-recipe-id="${recipe._id}" id="viewRecipe">View Recipe</button>
        <button class="btn btn-primary" data-recipe-id="${recipe._id}" id="editButton">Edit</button>
        ${
          isDeleteButtonVisible(recipe.author)
            ? `<button class="btn btn-danger" data-recipe-id="${recipe._id}">Delete</button>`
            : ""
        }
     
      </div>
    </div>
  </div>
  
    `;

    currentRow.appendChild(card);
  }
  const deleteButtons = container.querySelectorAll(".btn-danger");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const recipeId = button.getAttribute("data-recipe-id");
      // Call a function to handle the delete action with the recipeId
      handleDeleteRecipe(recipeId);
    });
  });
}

function isDeleteButtonVisible(author) {
  const loggedInUser = localStorage.getItem("username");
  return loggedInUser === "admin" || author === loggedInUser;
}

// Function to handle the delete action
async function handleDeleteRecipe(recipeId) {
  try {
    const response = await fetch(apiUrl + `recipes/${recipeId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Recipe deleted successfully, you can provide feedback to the user
      console.log("Recipe deleted successfully");
      // Refresh the recipe list or perform any other necessary actions
      // Refresh the recipe list by triggering a search
      const searchBox = document.getElementById("searchBox");
      const searchButton = document.getElementById("searchButton");
      searchBox.value = ""; // Clear the search input
      searchButton.click(); // Trigger a new search
    } else {
      throw new Error("Failed to delete recipe");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

//Clear the search box and view all the recipes
document.getElementById("recipeTab").addEventListener("click", async function () {
  // Clear the search input
  document.getElementById("searchBox").value = "";

  // Call fetchAndDisplayRecipes function to fetch and display recipes
  await fetchAndDisplayRecipes();
});

// functionality for viewing recipe
document.body.addEventListener('click', async function(event) {
  if (event.target.matches('.btn.btn-success') && event.target.hasAttribute('data-recipe-id')) {
    const recipeId = event.target.getAttribute('data-recipe-id');
    await viewSingleRecipe(recipeId);
    const mainContent = document.querySelector(".main-content");

    mainContent.classList.add("blur-background");
    // When opening the modal
    document.querySelector(".main-content").style.overflow = "hidden";

    // When closing the modal
    document.querySelector(".main-content").style.overflow = "auto";

    // Make the container visible
    document.querySelector('.container2.mt-4.viewer').style.display = 'block';
  }
});

document.getElementById("closeEditor").addEventListener("click", function () {
  const editorSection = document.querySelector(".editor");
  const bodyContent = document.querySelector(".main-content"); // Select the body or main content wrapper
  const viewerSection = document.querySelector(".viewer");
  // Hide the editor
  editorSection.style.display = "none";
//Hide the viewer
viewerSection.style.display = "none";
  // Remove blur from the background content
  bodyContent.classList.remove("blur-background");
  const searchBox = document.getElementById("searchBox");
  const searchButton = document.getElementById("searchButton");
  searchBox.value = ""; // Clear the search input
  searchButton.click(); // Trigger a new search
});