const apiUrl = 'https://rich-bat-bathing-suit.cyclic.app/';

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
                    <button class="btn btn-danger">Delete</button>
                </div>
            </div>
        `;

        currentRow.appendChild(card);
    }
}
