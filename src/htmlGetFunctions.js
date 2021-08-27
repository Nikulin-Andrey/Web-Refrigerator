function getRecipeSlideHtml(index, name, img, suitable) {
    const htmlCode = `
        <div class="recipe_slide swiper-slide">
            <div class="slide_recipe_content" data-index="${suitable? index : index + 'exect'}">
                <h3>${name}${suitable ? '' : '<br><span>Немного не подходит</span>'}</h3>
                <div class="slide_recipe_image_container">
                    <img src="${img}">
                </div>
            </div>
        </div>
    `;
    return htmlCode;
}

function getRecipeContentHtml(name, img, description, random = false, index, suitable = true) {
    const randomHeader = `
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
    `;
    const header = `
        <div class="recipe_exit">
            <img src="img/arrow.svg" alt="exit_recipe" class="arrow">
        </div>
    `;
    const id = suitable ? index : index + 'exect';
    const htmlCode = `
        <div class="recipe_content">
            ${random ? randomHeader : header}
            <div class="recipe_info">
                <div class="recipe_info_left_content">
                    <h3>${name}</h3>
                    <div class="recipe_image_container">
                        <img src="${img}">
                    </div>
                    <div class="ingredients_info">
                        <div id="ingredients_container_${random ? 'random' : id}">
                            <h3>Ингредиенты:</h3>
                            <ul></ul>
                        </div>
                    </div>
                </div>  
                <div class="recipe_info_right_content">
                    <h3>Рецепт</h3>
                    <p>${description}</p>
                </div>
            </div> 
        </div>
    `;
    return htmlCode;
}

export { getRecipeSlideHtml, getRecipeContentHtml };