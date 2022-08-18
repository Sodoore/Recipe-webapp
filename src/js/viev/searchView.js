import { elements } from "./base"

// image_url: "http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg"
// publisher: "101 Cookbooks"
// publisher_url: "http://www.101cookbooks.com"
// recipe_id: "47746"
// social_rank: 100
// source_url: "http://www.101cookbooks.com/archives/001199.html"
// title: "Best Pizza Dough Ever"
// private functions and datas
const renderRecipe = recipe =>{
    console.log(recipe);
    const markup = `
        <li>
            <a class="results__link" href="${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.title}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

    // ul ruu joruudaa nemne
    elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};
export const clearSearch = () =>{
    elements.searchInput.value = ``;
    elements.searchResultList.innerHTML = ``;
}
export const getInput = () => elements.searchInput.value;
export const renderRecipes = recipes => recipes.forEach(el => renderRecipe(el));