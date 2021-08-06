function renderRecipes(recipes, allIngredients) {
    const container = document.getElementById('recipes_container');
    if (recipes.length > 0) {
        recipes.forEach(function (recipe, index) {
            container.insertAdjacentHTML('beforeend', `
        <div class="recipe">
            <div class="recipe_exit">
                <img src="img/arrow.svg" alt="exit_recipe" class="arrow">
            </div>
            <div class="recipe_info">
                <div class="recipe_info_left_content">
                    <h3>${recipe.name}</h3>
                    <div class="recipe_image_container">
                        <img src="${recipe.img}">
                    </div>
                    <div class="ingredients_info">
                        <div id="ingredients_container_${index}">
                            <h3>Ингредиенты:</h3>
                            <ul></ul>
                        </div>
                    </div>
                </div>  
                <div class="recipe_info_right_content">
                    <h3>Рецепт</h3>
                    <p>${recipe.description}</p>
                </div>
            </div> 
        </div>
        `);
            const ingredientsContainer = document.getElementById(`ingredients_container_${index}`);
            recipe.ingredients.forEach(recipeIngredient => {
                const rightIngredient = allIngredients.find(ingredient => ingredient.id === recipeIngredient.id);
                ingredientsContainer.lastElementChild.insertAdjacentHTML('beforeend', `
                <li>${rightIngredient.name}: ${recipeIngredient.mass}гр</li>
            `);
            });
        });
    } else {
        container.innerHTML = '<h3>Ничего не найдено</h3>'
    }
}
function renderDropDownIngredientList(ingredients) {
    const list = document.getElementById('ingredient_selection');
    ingredients.forEach(ingredient => {
        list.insertAdjacentHTML('beforeend', `
        <option value="${ingredient.name}">
        `);
    });
}
function renderDayRecipes(recipe) {
    const container = document.getElementById('day_recipe');
    container.insertAdjacentHTML('beforeend', `
    <h2>${recipe.meals[0].strMeal}</h2>
    <div class="day_recipe_info">
        <p>${recipe.meals[0].strInstructions}</p>

        <div class="day_ingredients_container">
            <h3>Ингредиенты:</h3>
            <ul></ul>
        </div>
    </div>    
    `);
    const maxIngredients = 20;
    const ingredientsContainer = container.lastElementChild.lastElementChild;
    for (let i = 1; i <= maxIngredients; i++) {
        if (recipe.meals[0]['strIngredient' + i] != "") {
            ingredientsContainer.insertAdjacentHTML('beforeend', `
            <li>${recipe.meals[0]['strIngredient' + i]} ${recipe.meals[0]['strMeasure' + i]} </li>
            `);
        }
    }
}
export { renderRecipes, renderDropDownIngredientList, renderDayRecipes };