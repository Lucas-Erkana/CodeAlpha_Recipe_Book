const apiUrl = "https://busy-erin-sneakers.cyclic.app/";
document.getElementById("searchButton").addEventListener("click", async () => {
  try {
    const searchQuery = document
      .getElementById("searchBox")
      .value.trim()
      .toLowerCase();
    const response = await fetch(apiUrl + "recipes");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const recipes = await response.json();
    displayRecipes(recipes, searchQuery);
  } catch (error) {
    console.error("Error:", error);
  }
});

function displayRecipes(recipes, searchQuery) {
  const container = document.getElementById("recipesContainer");
  container.innerHTML = ""; // Clear existing content

  // Calculate the number of items per row (3 or 4)
  const itemsPerRow = 4; // You can change this to 3 if you want 3 items per row

  // Create rows to group the items
  let currentRow;
  for (let i = 0; i < recipes.length; i++) {
    if (i % itemsPerRow === 0) {
      currentRow = document.createElement("div");
      currentRow.className = "row";
      container.appendChild(currentRow);
    }

    const recipe = recipes[i];
    const card = document.createElement("div");
    card.className = "col-md-3 main-content"; // Adjust the column width as needed
    card.innerHTML = `
            <div class="card mb-3 main-content">
                <img src="${
                  recipe.images[0]
                }" class="card-img-top recipe-image" alt="${recipe.title}">
                <div class="card-body">
                    <h5 class="card-title">${recipe.title}</h5>
                    <p class="card-text">${recipe.description}</p>
                    <p class="card-text"><small class="text-muted">Prep Time: ${
                      recipe.prepTime
                    } mins | Cook Time: ${recipe.cookTime} mins</small></p>
                    <button class="btn btn-primary" data-recipe-id="${
                      recipe._id
                    }" id="editButton">Edit</button>
                    ${
                      isDeleteButtonVisible(recipe.author)
                        ? `<button class="btn btn-danger" data-recipe-id="${recipe._id}">Delete</button>`
                        : ""
                    }
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

//Functionality for editing on modal
document.body.addEventListener("click", async function (event) {
  if (
    event.target.matches(".btn.btn-primary") &&
    event.target.hasAttribute("data-recipe-id")
  ) {
    const recipeId = event.target.getAttribute("data-recipe-id");
    try {
      const response = await fetch(apiUrl + "recipes/" + recipeId);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const recipeData = await response.json();

      // Populate the form with recipe data
      document.getElementById("title2").value = recipeData.title;
      document.getElementById("description2").value = recipeData.description;
      document.getElementById("ingredients2").value = recipeData.ingredients;
      document.getElementById("instructions2").value = recipeData.instructions;
      document.getElementById("prepTime2").value = recipeData.prepTime;
      document.getElementById("cookTime2").value = recipeData.cookTime;
      document.getElementById("servings2").value = recipeData.servings;
      document.getElementById("cuisine2").value = recipeData.cuisine;
      document.getElementById("course2").value = recipeData.course;
      document.getElementById("images2").value = recipeData.images[0]; // Assuming it's the first image



      // Show the editor
      const editorSection = document.querySelector(".editor");
      const mainContent = document.querySelector(".main-content");
      editorSection.style.display = "block";
      mainContent.classList.add("blur-background");
      // When opening the modal
document.querySelector('.main-content').style.overflow = 'hidden';

// When closing the modal
document.querySelector('.main-content').style.overflow = 'auto';

      //Add listener for update button
      document
        .getElementById("editRecipeForm")
        .addEventListener("submit", async function (e) {
          e.preventDefault();

          // Gather form data
          const formData = {
            title: document.getElementById("title2").value,
            description: document.getElementById("description2").value,
            ingredients: document.getElementById("ingredients2").value,
            instructions: document.getElementById("instructions2").value,
            prepTime: document.getElementById("prepTime2").value,
            cookTime: document.getElementById("cookTime2").value,
            servings: document.getElementById("servings2").value,
            cuisine: document.getElementById("cuisine2").value,
            course: document.getElementById("course2").value,
            images: [document.getElementById("images2").value],
          };

          try {
            const updateResponse = await fetch(apiUrl + "recipes/" + recipeId, {
              method: "PUT", // or 'PATCH' depending on your API
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            });

            if (!updateResponse.ok) {
              throw new Error("Failed to update recipe");
            }

            // Display success message
            const successMessage = document.getElementById("successEdit");
            successMessage.style.display = "block";
            setTimeout(() => {
              successMessage.style.display = "none";
            }, 3000); // Hide after 3 seconds
          } catch (error) {
            console.error("Error updating recipe:", error);
          }
        });
    } catch (error) {
      console.error("Error fetching recipe data:", error);
    }
  }
});

document.getElementById("closeEditor").addEventListener("click", function () {
  const editorSection = document.querySelector(".editor");
  const bodyContent = document.querySelector(".main-content"); // Select the body or main content wrapper

  // Hide the editor
  editorSection.style.display = "none";

  // Remove blur from the background content
  bodyContent.classList.remove("blur-background");
  const searchBox = document.getElementById("searchBox");
  const searchButton = document.getElementById("searchButton");
  searchBox.value = ""; // Clear the search input
  searchButton.click(); // Trigger a new search
});
