const apiUrl = "https://busy-erin-sneakers.cyclic.app/";
const test = "6564e0a1c0052d3433688304";

async function viewSingleRecipe(recipeId) {
  try {
    const response = await fetch(`${apiUrl}recipes/${recipeId}`);
    if (!response.ok) {
      throw Error("Network response was not ok");
    }
    const recipe = await response.json();

    displayRecipe(recipe);
    toggler();
  } catch (error) {
    console.error("Error:", error);
  }
}

function displayRecipe(recipe) {
  const container = document.getElementById("recipeDetails");
  const formattedDate = new Date(recipe.dateCreated).toLocaleDateString(
    "en-US"
  );
  const instructions = recipe.instructions
    .split(". ")
    .filter((step) => step.trim() !== "");

  container.innerHTML = `
  <div class="modal-content">
  <div class="contenter">
    <div class="image">
      <h2 style="font-size: 24px; margin-bottom: 10px;">${recipe.title}</h2>
      <p><strong>Description:</strong> <span style="font-size: 18px;">${
        recipe.description
      }</span></p>
      <img src="${recipe.images[0]}" class="img-fluid rounded" alt="${recipe.title}">
    </div>
    <div class="data">
      <h4 id="ingredientsHeader" style="font-size: 20px; margin-top: 20px;">Ingredients <span class="toggle-btn" id="toggler">▼</span></h4>
      <ul id="ingredients" style="list-style-type: disc; font-size: 18px; margin-left: 20px; display: none";>
        ${recipe.ingredients
          .map((ingredient) => `<li>${ingredient}</li>`)
          .join("")}
      </ul>
     
      <h4 style="font-size: 20px; margin-top: 20px;">Instructions <span class="toggle-btn" onclick="toggle-btn" id="toggler2">▼</span></h4>
      <ol id="instructions" style="list-style-type: decimal; font-size: 18px; margin-left: 20px; display: none";>
        ${instructions.map((step) => `<li>${step.trim()}.</li>`).join("")}
      </ol>
      
      <p style="font-size: 18px;"><strong>Preparation Time:</strong> ${
        recipe.prepTime
      } minutes</p>
      <p style="font-size: 18px;"><strong>Cooking Time:</strong> ${
        recipe.cookTime
      } minutes</p>
      <p style="font-size: 18px;"><strong>Servings:</strong> ${
        recipe.servings
      }</p>
      <p style="font-size: 18px;"><strong>Author:</strong> ${recipe.author}</p>
      <p style="font-size: 18px;"><strong>Date Created:</strong> ${formattedDate}</p>
    </div>
  </div>
</div>


  
    `;
}

// Fetch and display the recipe with ID 'test'
viewSingleRecipe(test);
// Get a reference to the header and content elements for Ingredients
function toggler() {
  const ingredientsHeader = document.getElementById("ingredientsHeader");
  const ingredientsContent = document.getElementById("ingredients");
  const ingredientsToggle = document.getElementById("toggler");

  // Add a click event listener to the Ingredients button
  ingredientsToggle.addEventListener("click", () => {
    if (
      ingredientsContent.style.display === "none" ||
      ingredientsContent.style.display === ""
    ) {
      ingredientsContent.style.display = "block";
      ingredientsToggle.textContent = "▲"; // Change the icon to "▲" when expanded
    } else {
      ingredientsContent.style.display = "none";
      ingredientsToggle.textContent = "▼"; // Change the icon to "▼" when collapsed
    }
  });

  // Get a reference to the header and content elements for Instructions
  const instructionsHeader = document.getElementById("instructionsHeader");
  const instructionsContent = document.getElementById("instructions");
  const instructionsToggle = document.getElementById("toggler2");

  // Add a click event listener to the Instructions button
  instructionsToggle.addEventListener("click", () => {
    if (
      instructionsContent.style.display === "none" ||
      instructionsContent.style.display === ""
    ) {
      instructionsContent.style.display = "block";
      instructionsToggle.textContent = "▲"; // Change the icon to "▲" when expanded
    } else {
      instructionsContent.style.display = "none";
      instructionsToggle.textContent = "▼"; // Change the icon to "▼" when collapsed
    }
  });
}
