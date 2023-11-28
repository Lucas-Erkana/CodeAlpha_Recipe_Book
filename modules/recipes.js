const apiUrl = 'https://busy-erin-sneakers.cyclic.app/';

document.getElementById('searchButton').addEventListener('click', async () => {
    try {
        const searchQuery = document.getElementById('searchBox').value.trim().toLowerCase();
        const response = await fetch(apiUrl + 'recipes');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const recipes = await response.json();
        displayRecipes(recipes, searchQuery);
    } catch (error) {
        console.error('Error:', error);
    }
});

function displayRecipes(recipes, searchQuery) {
    const container = document.getElementById('recipesContainer');
    container.innerHTML = ''; // Clear existing content

    // Calculate the number of items per row (3 or 4)
    const itemsPerRow = 4; // You can change this to 3 if you want 3 items per row

    // Create rows to group the items
    let currentRow;
    for (let i = 0; i < recipes.length; i++) {
        if (i % itemsPerRow === 0) {
            currentRow = document.createElement('div');
            currentRow.className = 'row';
            container.appendChild(currentRow);
        }

        const recipe = recipes[i];
        const card = document.createElement('div');
        card.className = 'col-md-3'; // Adjust the column width as needed
        card.innerHTML = `
            <div class="card mb-3">
                <img src="${recipe.images[0]}" class="card-img-top recipe-image" alt="${recipe.title}">
                <div class="card-body">
                    <h5 class="card-title">${recipe.title}</h5>
                    <p class="card-text">${recipe.description}</p>
                    <p class="card-text"><small class="text-muted">Prep Time: ${recipe.prepTime} mins | Cook Time: ${recipe.cookTime} mins</small></p>
                    <button class="btn btn-primary">Edit</button>
                    ${isDeleteButtonVisible(recipe.author) ? `<button class="btn btn-danger" data-recipe-id="${recipe._id}">Delete</button>` : ''}
                </div>
            </div>
        `;

        currentRow.appendChild(card);
    }
    const deleteButtons = container.querySelectorAll('.btn-danger');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const recipeId = button.getAttribute('data-recipe-id');
            // Call a function to handle the delete action with the recipeId
            handleDeleteRecipe(recipeId);
        });
    });
}

function isDeleteButtonVisible(author) {
    const loggedInUser = localStorage.getItem('username');
    return loggedInUser === 'admin' || author === loggedInUser;
}

// Function to handle the delete action
async function handleDeleteRecipe(recipeId) {
    try {
        const response = await fetch(apiUrl + `recipes/${recipeId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            // Recipe deleted successfully, you can provide feedback to the user
            console.log('Recipe deleted successfully');
            // Refresh the recipe list or perform any other necessary actions
                        // Refresh the recipe list by triggering a search
                        const searchBox = document.getElementById('searchBox');
                        const searchButton = document.getElementById('searchButton');
                        searchBox.value = ''; // Clear the search input
                        searchButton.click(); // Trigger a new search
        } else {
            throw new Error('Failed to delete recipe');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
