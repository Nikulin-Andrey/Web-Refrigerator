import { renderDropDownIngredientList, renderRecipes } from './renderFunctions.js';
import getSuitableRecipes from './getSuitableRecipes.js';
import { scrollToRecipes } from './recipesFunctions.js';
import { cleanInputs, isCorrectInputs, addIngredient } from './ingredientsFunctions.js'

export default function chooseIngredient(ingredients, recipes) {
    renderDropDownIngredientList(ingredients);
    const recipesContainerSlider = document.getElementById('recipes_container_slider');
    const recipesContainer = document.getElementById('recipes_container');
    const showAll = document.getElementById('show_all');
    const selectIngredient = document.getElementById('selected_ingredient');
    const selectMass = document.getElementById('mass');
    const buttonAdd = document.getElementById('add');
    const selected = [];
    const buttonFind = document.getElementById('find');
    buttonFind.addEventListener('click', function () {
        getSuitableRecipes(selected, recipes);
        scrollToRecipes(recipesContainerSlider.parentElement.parentElement.offsetTop);
    });
    showAll.addEventListener('click', function () {
        const notFound = document.getElementById('not_found')
        if (notFound) {
            notFound.remove();
        }
        recipesContainerSlider.innerHTML = '';
        recipesContainer.innerHTML = '';
        renderRecipes(recipes, ingredients);
        showAll.classList.add('hide');
    });
    buttonFind.classList.add('hide');
    const ingredientsContainer = document.getElementById('selected_ingredients');
    buttonAdd.addEventListener('click', function () {
        if (!isCorrectInputs(selected, selectIngredient, selectMass, ingredients)) {
            cleanInputs(selectMass, selectIngredient);
            return;
        }
        addIngredient(selected, ingredients, selectMass, ingredientsContainer, selectIngredient, buttonFind);
    });
    selectIngredient.addEventListener('keypress', function (e) {
        if (e.code === 'Enter') {
            selectMass.focus();
        }
    });
    selectMass.addEventListener('keypress', function (e) {
        if (e.code === 'Enter') {
            const click = new Event('click');
            buttonAdd.dispatchEvent(click);
            selectIngredient.focus();
        }
    });
    ingredientsContainer.addEventListener('click', function (e) {
        if (e.target.hasAttribute('data-delete')) {
            const targetIngredientId = Number(e.target.getAttribute('data-delete'));
            const index = selected.findIndex(ingredient => ingredient.id === targetIngredientId);
            selected.splice(index, 1);
            const ingredientContainer = document.getElementById(targetIngredientId);
            ingredientContainer.parentNode.removeChild(ingredientContainer);
            if (selected.length === 0) {
                buttonFind.classList.add('hide');
            }
        }
    });
}