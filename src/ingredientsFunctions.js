function cleanInputs(mass, ingredient) {
    mass.value = "";
    ingredient.value = "";
}

function isCorrectInputs(selected, selectIngredient, selectMass, ingredients) {
    const selectedIngredient = selectIngredient.value.toLowerCase();
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
export { cleanInputs, isCorrectInputs, addIngredient };