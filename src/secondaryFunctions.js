import { renderDayRecipes } from './renderFunctions';
import loadJSON from './loadJSON';

function cleanInputs(mass, ingredient) {
    mass.value = "";
    ingredient.value = "";
}
function isCorrectInputs(selected, selectIngredient, selectMass, ingredients) {
    if (selected.find(selectedItem => selectedItem.name === selectIngredient.value)) {
        alert(`ингредиент ${selectIngredient.value} уже был выбран`);
        return false;
    }
    if (isNaN(selectMass.value)) {
        alert(`"${selectMass.value}" это не число, пожалуйста введите число`);
        return false;
    }
    if (!ingredients.find(ingredient => ingredient.name === selectIngredient.value)) {
        alert(`Ингредиента "${selectIngredient.value}" не существует`);
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
    selected.push({
        ...ingredients.find(ingredient => selectIngredient.value === ingredient.name),
        mass: Number(selectMass.value)
    });
    const newIngredientId = selected[selected.length - 1].id;
    container.insertAdjacentHTML('beforeend', `
        <div class="selected" id="${newIngredientId}">
            ${selectIngredient.value}: ${Number(selectMass.value)} 
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
    recipeContainers.forEach(recipeContainer => {
        recipeContainer.addEventListener('click', (e) => {
            if (recipeContainer.getAttribute('class') === 'recipe') {
                recipeContainer.classList.add('height0');
                setTimeout(() => {
                    recipeContainer.classList.add('open');
                }, 200);
            } else if (
                e.target.getAttribute('class') === 'recipe_exit' ||
                e.target.parentElement.getAttribute('class') === 'recipe_exit'
            ) {
                recipeContainer.classList.remove('open');
                recipeContainer.classList.remove('height0');
            }
        })
    });
}
function setRandomRecipeOpening() {
    const openRandomRecipe = document.getElementById('random');
    openRandomRecipe.addEventListener('click', () => {
        loadRandomRecipe();
        const recipeContainer = document.getElementById('random_recipe');
        recipeContainer.classList.add('open');
    });
}
async function loadRandomRecipe() {
    const randomRecipe = await loadJSON('https://www.themealdb.com/api/json/v1/1/random.php');
    renderDayRecipes(randomRecipe);
}
export { cleanInputs, isCorrectInputs, addIngredient, isAllRecipes, setRecipeOpening, setRandomRecipeOpening, loadRandomRecipe };