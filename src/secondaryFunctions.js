import { renderRandomRecipes } from './renderFunctions';
import loadJSON from './loadJSON';

function cleanInputs(mass, ingredient) {
    mass.value = "";
    ingredient.value = "";
}
function isCorrectInputs(selected, selectIngredient, selectMass, ingredients) {
    const selectedIngredient = selectIngredient.value.toLowerCase();
    console.log(selectedIngredient)
    if (selected.find(selectedItem => selectedItem.name === selectedIngredient)) {
        alert(`ингредиент ${selectedIngredient} уже был выбран`);
        return false;
    }
    if (isNaN(selectMass.value)) {
        alert(`"${selectMass.value}" это не число, пожалуйста введите число`);
        return false;
    }
    if (!ingredients.find(ingredient => ingredient.name === selectedIngredient)) {
        alert(`Ингредиента "${selectedIngredient}" не существует`);
        return false;
    }
    if (Number(selectMass.value) < 0) {
        alert(`${selectMass.value} < 0, масса не может быть меньше нуля`);
        return false;
    }
    if (Number(selectMass.value) === 0) {
        return false;
    }
    return true;
}
function addIngredient(selected, ingredients, selectMass, container, selectIngredient, buttonFind) {
    const selectedIngredient = selectIngredient.value.toLowerCase();
    selected.push({
        ...ingredients.find(ingredient => selectedIngredient === ingredient.name),
        mass: Number(selectMass.value)
    });
    const newIngredientId = selected[selected.length - 1].id;
    container.insertAdjacentHTML('beforeend', `
        <div class="selected" id="${newIngredientId}">
            ${selectedIngredient}: ${Number(selectMass.value)} 
            <span data-delete="${newIngredientId}" class="material-icons md-18 deliter">
                close
            </span>
        </div>
    `);
    if (selected.length > 0) {
        buttonFind.classList.remove('hide');
    }
    cleanInputs(selectMass, selectIngredient);
}
function isAllRecipes(suitable, recipes) {
    const showAll = document.getElementById('show_all');
    if (suitable.length < recipes.length) {
        showAll.classList.remove('hide');
    } else {
        showAll.classList.add('hide');
    }
}
function setRecipeOpening(recipeContainers) {
    const body = document.getElementsByTagName('body');
    recipeContainers.forEach(recipeContainer => {
        const recipe = document.getElementById('recipe' + recipeContainer.getAttribute('data-index'));
        recipeContainer.addEventListener('click', (e) => {
            // if (
            //     e.target.getAttribute('class') === 'recipe_exit' ||
            //     e.target.parentElement.getAttribute('class') === 'recipe_exit'
            // ) {
            //     recipeContainer.classList.remove('open');
            // }
            recipe.classList.add('open');
            body[0].classList.add('noscroll');
        })
        const closeRecipe = recipe.firstElementChild.firstElementChild;
        closeRecipe.addEventListener('click', () => {
            recipe.classList.remove('open');
            body[0].classList.remove('noscroll');
        });
    });
}
function setRandomRecipeOpening() {
    const openRandomRecipe = document.getElementById('random');
    const body = document.getElementsByTagName('body');
    openRandomRecipe.addEventListener('click', () => {
        loadRandomRecipe();
        const recipeContainer = document.getElementById('random_recipe');
        recipeContainer.classList.add('open');
        body[0].classList.add('noscroll');
    });
}
async function loadRandomRecipe() {
    const randomRecipe = await loadJSON('https://www.themealdb.com/api/json/v1/1/random.php');
    renderRandomRecipes(randomRecipe);
}
export { cleanInputs, isCorrectInputs, addIngredient, isAllRecipes, setRecipeOpening, setRandomRecipeOpening, loadRandomRecipe };