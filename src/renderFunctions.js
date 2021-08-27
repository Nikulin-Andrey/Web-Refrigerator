import { setRecipeOpening, loadRandomRecipe } from './recipesFunctions.js';
import { getRecipeSlideHtml, getRecipeContentHtml } from './htmlGetFunctions';
import setSlider from './setSlider.js';

function renderRecipes(recipes, allIngredients, suitable = true) {
    const sliderRecipesContainer = document.getElementById('recipes_container_slider');
    const recipesContainer = document.getElementById('recipes_container');
    if (recipes.length > 0) { 
        const randomRecipe = false;
        recipes.forEach(function (recipe, index) {
            sliderRecipesContainer.insertAdjacentHTML('beforeend', getRecipeSlideHtml(index, recipe.name, recipe.img, suitable));
            recipesContainer.insertAdjacentHTML('beforeend', `
                <div class="recipe" id="recipe${suitable? index : index + 'exect'}">
                    ${getRecipeContentHtml(recipe.name, recipe.img, recipe.description, randomRecipe, index, suitable)}
                </div>
            `);
            const ingredientsContainer = document.getElementById(`ingredients_container_${suitable? index : index + 'exect'}`);
            recipe.ingredients.forEach(recipeIngredient => {
                const rightIngredient = allIngredients.find(ingredient => ingredient.id === recipeIngredient.id);
                ingredientsContainer.lastElementChild.insertAdjacentHTML('beforeend', `
                <li>${rightIngredient.name}: ${recipeIngredient.mass}гр</li>
            `);
            });
        });
        const recipeContainers = container.querySelectorAll('.slide_recipe_content');
        setRecipeOpening(recipeContainers);
    } else {
        renderNotFound();
    }
    setSlider();
}

function renderNotFound() {
    const oldNotFound = document.getElementById('not_find');
    if (!oldNotFound) {
        const notFound = document.createElement('div');
        notFound.setAttribute('id', 'not_found');
        notFound.innerHTML = '<h2>Ничего не найдено</h2>';
        const showAll = document.getElementById('show_all').parentElement;
        showAll.parentNode.insertBefore(notFound, showAll);
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
function renderRandomRecipes(recipe) {
    const container = document.getElementById('random_recipe');
    const body = document.body;
    const randomRecipe = true;
    const recipeName = recipe.meals[0].strMeal;
    const recipeImg = recipe.meals[0].strMealThumb;
    const recipeDescription = recipe.meals[0].strInstructions;
    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', getRecipeContentHtml(recipeName, recipeImg, recipeDescription, randomRecipe));
    const maxIngredients = 20;
    const ingredientsContainer = document.getElementById('ingredients_container_random').lastElementChild;
    const closeRecipe = container.querySelector('.recipe_exit');
    const reloadRecipe = container.querySelector('.recipe_reload');
    for (let i = 1; i <= maxIngredients; i++) {
        if (recipe.meals[0]['strIngredient' + i] != "") {
            ingredientsContainer.insertAdjacentHTML('beforeend', `
            <li>${recipe.meals[0]['strIngredient' + i]} ${recipe.meals[0]['strMeasure' + i]} </li>
            `);
        }
    }
    closeRecipe.addEventListener('click', () => {
        container.classList.remove('open');
        body.classList.remove('noscroll');
    });
    reloadRecipe.addEventListener('click', loadRandomRecipe);
}
export { renderRecipes, renderDropDownIngredientList, renderRandomRecipes };