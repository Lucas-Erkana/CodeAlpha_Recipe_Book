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

    // Filter recipes based on search query
    const filteredRecipes = recipes.filter(recipe => 
        recipe.title.toLowerCase().includes(searchQuery)
    );

    filteredRecipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'card mb-3';
        card.innerHTML = `
            <img src="${recipe.images[0]}" class="card-img-top recipe-image" alt="${recipe.title}">
            <div class="card-body">
                <h5 class="card-title">${recipe.title}</h5>
                <p class="card-text">${recipe.description}</p>
                <p class="card-text"><small class="text-muted">Prep Time: ${recipe.prepTime} mins | Cook Time: ${recipe.cookTime} mins</small></p>
            </div>
        `;
        container.appendChild(card);
    });
}
