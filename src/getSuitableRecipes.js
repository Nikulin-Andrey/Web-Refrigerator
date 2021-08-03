import {renderRecipes} from './renderFunctions.js';
import {isAllRecipes} from './secondaryFunctions.js';

export default function getSuitableRecipes(selectedIngredients, recipes) {
    const container = document.getElementById('recipes_container');
    console.log(selectedIngredients);
    const suitableRecipes = [], exactleSuitableRecipes = [];
    let ingredient = {},
        suitable = true,
        exactleSuitable = true;
    recipes.forEach(function (recipe) {
        suitable = true;
        exactleSuitable = true;
        recipe.ingredients.forEach(function (recipeIngredient) {
            ingredient = selectedIngredients.find(ingredient => ingredient.id === recipeIngredient.id);
            if (!ingredient) {
                suitable = false;
                exactleSuitable = false;
                return;
            } else {
                if (ingredient.mass < recipeIngredient.mass) {
                    suitable = false;
                    if (ingredient.mass < recipeIngredient.mass * 0.75) {
                        exactleSuitable = false;
                    }
                    return;
                }
            }
        });
        if (suitable) {
            suitableRecipes.push(recipe);
        }
        if (exactleSuitable && !suitable) {
            exactleSuitableRecipes.push(recipe);
        }
    })
    container.innerHTML = '';
    console.log(suitableRecipes, exactleSuitableRecipes)
    if(suitableRecipes.length > 0) {
        container.insertAdjacentHTML('beforeend', `<h2>Полностью подходят</h2>`);
        renderRecipes(suitableRecipes, selectedIngredients);
    }
    if (exactleSuitableRecipes.length > 0) {
        container.insertAdjacentHTML('beforeend', `<h2>Частично подходят</h2>`);
        renderRecipes(exactleSuitableRecipes, selectedIngredients);
    }
    isAllRecipes(suitableRecipes, recipes);
}