import { renderRandomRecipes } from './renderFunctions';
import loadJSON from './loadJSON';

function isAllRecipes(suitable, recipes) {
    const showAll = document.getElementById('show_all');
    if (suitable.length < recipes.length) {
        showAll.classList.remove('hide');
    } else {
        showAll.classList.add('hide');
    }
}
function setRecipeOpening(recipeContainers) {
    const body = document.body;
    recipeContainers.forEach(recipeContainer => {
        const recipe = document.getElementById('recipe' + recipeContainer.getAttribute('data-index'));
        recipeContainer.addEventListener('click', () => {
            recipe.classList.add('open');
            body.classList.add('noscroll');
        })
        const closeRecipe = recipe.firstElementChild.firstElementChild;
        closeRecipe.addEventListener('click', () => {
            recipe.classList.remove('open');
            body.classList.remove('noscroll');
        });
    });
}
function setRandomRecipeOpening() {
    const openRandomRecipe = document.getElementById('random');
    const body = document.body;
    openRandomRecipe.addEventListener('click', () => {
        loadRandomRecipe();
        const recipeContainer = document.getElementById('random_recipe');
        recipeContainer.classList.add('open');
        body.classList.add('noscroll');
    });
}
async function loadRandomRecipe() {
    const randomRecipe = await loadJSON('https://www.themealdb.com/api/json/v1/1/random.php');
    renderRandomRecipes(randomRecipe);
}
function scrollToRecipes(height) {
    window.scrollTo({
        top: height,
        left: 0,
        behavior: 'smooth'
    });
}
export { isAllRecipes, setRecipeOpening, setRandomRecipeOpening, loadRandomRecipe, scrollToRecipes };