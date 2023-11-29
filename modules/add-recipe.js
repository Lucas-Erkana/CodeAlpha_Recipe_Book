// users.js
const apiUrl ='https://busy-erin-sneakers.cyclic.app/'
// Function to show success message and then hide it after 2 seconds
function showSuccessMessage() {
  document.getElementById("successMessage").style.display = "block";
  document.querySelector(".Add-Recipe").style.display = "none";
  setTimeout(function () {
    document.getElementById("successMessage").style.display = "none";
    // Show the Add Recipe section
    document.querySelector(".Add-Recipe").style.display = "block";
  }, 2000); // 2000 milliseconds (2 seconds)
}

document
  .getElementById("addRecipeForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    // Split ingredients by comma and trim each one
    const ingredients = document
      .getElementById("ingredients")
      .value.split(",")
      .map((ingredient) => ingredient.trim());
    const instructions = document.getElementById("instructions").value;
    const prepTime = document.getElementById("prepTime").value;
    const cookTime = document.getElementById("cookTime").value;
    const servings = document.getElementById("servings").value;
    const cuisine = document.getElementById("cuisine").value;
    const course = document.getElementById("course").value;
    const images = [document.getElementById("images").value];
    const dateCreated = new Date(); // This will create a Date object with the current date and time

    // Add author from local storage
    const author = localStorage.getItem("username");

    try {
      const response = await fetch(apiUrl + "recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
          ingredients: ingredients,
          instructions: instructions,
          prepTime: prepTime,
          cookTime: cookTime,
          servings: servings,
          cuisine: cuisine,
          course: course,
          images: images,
          author: author, // Include the author in the request body
          dateCreated: dateCreated,
        }),
      });

      // Handling response as text
      const data = await response.text();

      console.log("Response received: ", data);
      // Show success message and hide it after 2 seconds
      showSuccessMessage();
      clearFormInputs();
    } catch (error) {
      console.error("Error:", error);
    }
  });

// Activate Recipe tab and Add recipe tab
// Add an event listener for the "Add Recipe" button
document.getElementById("add-recipeTab").addEventListener("click", function () {
  // Hide the Recipe section
  document.querySelector(".Recipe").style.display = "none";
  // Show the Add Recipe section
  document.querySelector(".Add-Recipe").style.display = "block";
});

// Add an event listener for the "Recipe" button
document.getElementById("recipeTab").addEventListener("click", function () {
  // Hide the Add Recipe section
  document.querySelector(".Add-Recipe").style.display = "none";
  // Show the Recipe section
  document.querySelector(".Recipe").style.display = "block";
});


function clearFormInputs() {
  document.getElementById("title").value = '';
  document.getElementById("description").value = '';
  document.getElementById("ingredients").value = '';
  document.getElementById("instructions").value = '';
  document.getElementById("prepTime").value = '';
  document.getElementById("cookTime").value = '';
  document.getElementById("servings").value = '';
  document.getElementById("cuisine").value = '';
  document.getElementById("course").value = '';
  document.getElementById("images").value = '';
}
