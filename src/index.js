import {renderRecipes, renderDayRecipes} from './renderFunctions.js';
import chooseIngredient from './chooseIngredient.js';
import loadJSON from './loadJSON';

async function initApp() {
    const allIngredients = await loadJSON('./ingredients.json');
    const recipes = await loadJSON('./recipes.json');
    
    renderRecipes(recipes, allIngredients);
    chooseIngredient(allIngredients, recipes);
    const dayRecipe = await loadJSON('https://www.themealdb.com/api/json/v1/1/random.php');
    renderDayRecipes(dayRecipe);
}

initApp();