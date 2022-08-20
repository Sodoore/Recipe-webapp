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
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
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
    elements.pageButtons.innerHTML = ``;

}
export const getInput = () => elements.searchInput.value;
export const renderRecipes = (recipes, currentPage = 1, resPerPage = 8) =>{ 
    // Хайлтын үр дүнг хуудаслаж үзүүлэх
    const start = (currentPage - 1) * resPerPage;
    const end = currentPage * resPerPage;

    recipes.slice(start, end).forEach(el => renderRecipe(el))


    // Хуудаслалтын точнуудыг гаргаж ирэх
    const totalPages = Math.ceil(recipes.length / resPerPage);
    renderButtons(currentPage, totalPages);
};

// type ====> "next" or "prev"
const createButton = (page, type, direction) => 
` <button class="btn-inline results__btn--${type}" data-goto=${page}>
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${direction}"></use>
</svg>
<span>Хуудас ${page}</span>
</button>`


const renderButtons = (currentPage, totalPages) => {
    let button;

    if( currentPage === 1 && totalPages > 1  ){
        // Эхний хуудас дээр байна 
        button = createButton( 2, "next", "right" );
    }else if(currentPage < totalPages){
        // Дараагийн хуудсан дээр байна
        button = createButton(currentPage - 1, "prev", "left");
        button += createButton(currentPage + 1, "next", "right");
    }else if(currentPage === totalPages){
        // Сүүлийн хуудсанд  байна
        button = createButton(currentPage - 1, "prev", "left")
    }

    elements.pageButtons.insertAdjacentHTML("afterbegin", button);
};
