import { renderRecipes } from './renderFunctions.js';
import { isAllRecipes } from './recipesFunctions.js';

export default function getSuitableRecipes(selectedIngredients, recipes) {
    const container = document.getElementById('recipes_container_slider');
    const recipesContainer = document.getElementById('recipes_container');
    const suitableRecipes = [], exactleSuitableRecipes = [];
    let ingredient = {},
        suitable = true,
        exactleSuitable = true;
    recipes.forEach(function (recipe) {
        suitable = true;
        exactleSuitable = true;
        recipe.ingredients.forEach(function (recipeIngredient) {
            ingredient = selectedIngredients.find(selectedIngredient => selectedIngredient.id === recipeIngredient.id);
            if (!ingredient) {
                suitable = false;
                exactleSuitable = false;
                return;
            }
            if (ingredient.mass < recipeIngredient.mass) {
                suitable = false;
                if (ingredient.mass < recipeIngredient.mass * 0.75) {
                    exactleSuitable = false;
                }
                return;
            }
        });
        if (suitable) {
            suitableRecipes.push(recipe);
        }
        if (exactleSuitable && !suitable) {
            exactleSuitableRecipes.push(recipe);
        }
    });
    container.innerHTML = '';
    recipesContainer.innerHTML = '';
    if (suitableRecipes.length > 0) {
        suitable = true;
        renderRecipes(suitableRecipes, selectedIngredients, suitable);
    }
    if (exactleSuitableRecipes.length > 0) {
        suitable = false;
        renderRecipes(exactleSuitableRecipes, selectedIngredients, suitable);
    }
    if (suitableRecipes.length === 0 && exactleSuitableRecipes.length === 0) {
        renderRecipes(suitableRecipes, selectedIngredients, suitable);
    }
    isAllRecipes(suitableRecipes, recipes);
}