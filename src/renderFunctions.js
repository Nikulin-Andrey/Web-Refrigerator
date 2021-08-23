import { setRecipeOpening, loadRandomRecipe } from './secondaryFunctions.js';
import Swiper from 'swiper';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import 'swiper/swiper-bundle.css';

function renderRecipes(recipes, allIngredients, suitable = true) {
    const sliderRecipesContainer = document.getElementById('recipes_container_slider');
    const recipesContainer = document.getElementById('recipes_container');
    recipesContainer.innerHTML = '';
    if (recipes.length > 0) {
        recipes.forEach(function (recipe, index) {
            sliderRecipesContainer.insertAdjacentHTML('beforeend', `
        <div class="recipe_slide swiper-slide">
            <div class="slide_recipe_content" data-index="${index}">
                <h3>${recipe.name}${suitable ? '' : '<br><span>Немного не подходит</span>'}</h3>
                <div class="slide_recipe_image_container">
                    <img src="${recipe.img}">
                </div>
            </div>
        </div>
        `);
            recipesContainer.insertAdjacentHTML('beforeend', `
        <div class="recipe" id="recipe${index}">
            <div class="recipe_content">
                <div class="recipe_exit">
                    <img src="img/arrow.svg" alt="exit_recipe" class="arrow">
                </div>
                <div class="recipe_info">
                    <div class="recipe_info_left_content">
                        <h3>${recipe.name}</h3>
                        <div class="recipe_image_container">
                            <img src="${recipe.img}">
                        </div>
                        <div class="ingredients_info">
                            <div id="ingredients_container_${index}">
                                <h3>Ингредиенты:</h3>
                                <ul></ul>
                            </div>
                        </div>
                    </div>  
                    <div class="recipe_info_right_content">
                        <h3>Рецепт</h3>
                        <p>${recipe.description}</p>
                    </div>
                </div> 
            </div>
        </div>
        `);
            const ingredientsContainer = document.getElementById(`ingredients_container_${index}`);
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
        const oldNotFind = document.getElementById('not_find');
        if(!oldNotFind) {
            const notFind = document.createElement('div');
            notFind.setAttribute('id', 'not_find');
            notFind.innerHTML = '<h2>Ничего не найдено</h2>';
            const showAll = document.getElementById('show_all').parentElement;
            showAll.parentNode.insertBefore(notFind, showAll);
        }
    }
    SwiperCore.use([Navigation, Pagination]);
    const swiper = new Swiper('.swiper-container', {
        loop: false,
        slidesPerView: 3,
        spaceBetween: 30,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
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
    const body = document.getElementsByTagName('body');
    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', `
    <div class="recipe_content">
                <div class="recipe_header">
                    <div class="recipe_exit">
                        <img src="img/arrow.svg" alt="exit_recipe" class="arrow">
                    </div>
                    <div class="recipe_reload">
                        <span class="material-icons md-48">
                        autorenew
                        </span>
                    </div>
                </div>
                <div class="recipe_info">
                    <div class="recipe_info_left_content">
                        <h3>${recipe.meals[0].strMeal}</h3>
                        <div class="recipe_image_container">
                            <img src="${recipe.meals[0].strMealThumb}">
                        </div>
                        <div class="ingredients_info">
                            <div id="ingredients_container_random">
                                <h3>Ингредиенты:</h3>
                                <ul></ul>
                            </div>
                        </div>
                    </div>  
                    <div class="recipe_info_right_content">
                        <h3>Рецепт</h3>
                        <p>${recipe.meals[0].strInstructions}</p>
                    </div>
                </div> 
            </div>    
    `);
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
        body[0].classList.remove('noscroll');
    });
    reloadRecipe.addEventListener('click', loadRandomRecipe);
}
export { renderRecipes, renderDropDownIngredientList, renderRandomRecipes };