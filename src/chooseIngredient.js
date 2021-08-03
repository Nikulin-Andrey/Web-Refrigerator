import {renderDropDownIngredientList, renderRecipes} from './renderFunctions.js';
import getSuitableRecipes from './getSuitableRecipes.js';
import {cleanInputs, isCorrectInputs, addIngredient} from './secondaryFunctions.js';

export default function chooseIngredient(ingredients, recipes) {
    renderDropDownIngredientList(ingredients);
    const recipesContainer = document.getElementById('recipes_container');
    const showAll = document.getElementById('show_all');
    const selectIngredient = document.getElementById('selected_ingredient');
    const selectMass = document.getElementById('mass');
    const buttonAdd = document.getElementById('add');
    const selected = [];
    const buttonFind = document.getElementById('find');
    buttonFind.addEventListener('click', function () {
        getSuitableRecipes(selected, recipes);
    });
    showAll.addEventListener('click', function() {
        recipesContainer.innerHTML = '';
        renderRecipes(recipes, ingredients);
        showAll.classList.add('hide');
    });
    buttonFind.classList.add('hide');
    const container = document.getElementById('selected_ingredients');
    buttonAdd.addEventListener('click', function () {
        if (!isCorrectInputs(selected, selectIngredient, selectMass, ingredients)) {
            cleanInputs(selectMass, selectIngredient);
            return;
        }
        addIngredient(selected, ingredients, selectMass, container, selectIngredient, buttonFind);
    });
    container.addEventListener('click', function (e) {
        if (e.target.hasAttribute('data-delete')) {
            const index = selected.findIndex(ingredient => ingredient.id === Number(e.target.getAttribute('data-delete')));
            selected.splice(index, 1);
            e.target.parentElement.innerHTML = '';
            if (selected.length === 0) {
                buttonFind.classList.add('hide');
            }
        }
    });
}