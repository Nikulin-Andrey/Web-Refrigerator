import {renderRecipes} from './renderFunctions.js';
import chooseIngredient from './chooseIngredient.js';
import {setRandomRecipeOpening} from './secondaryFunctions';
import loadJSON from './loadJSON';


async function initApp() {
    const allIngredients = await loadJSON('./ingredients.json');
    const recipes = await loadJSON('./recipes.json');
    renderRecipes(recipes, allIngredients);
    chooseIngredient(allIngredients, recipes);
    setRandomRecipeOpening();
}

initApp();