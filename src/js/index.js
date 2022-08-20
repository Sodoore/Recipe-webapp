import axios from 'axios';
import Search from './model/search';
import { elements, renderLoader, clearLoader} from './viev/base';
import * as searchView from './viev/searchView';
import Recipe from './model/recipe';
import {clearRecipe, rendRec} from './viev/recipeView';

/**
 * Web app төлөв
 * Хайлтын query, үр дүн
 * Тухайн үзүүлж баыгаа жор
 * Лайкласан жор
 * Захиалж байгаа жорын орц
 */

const state = {};

const controlSearch = async () =>{
    // 1) Вэбээс хайлтын түлхүүр үгийг гаргаж авна.
    const query = searchView.getInput();

    if(query){
        // 2) Шинээр хайлтын обьектыг үүсгэж өгнө.
        state.search = new Search(query);
        // 3) Хайлт Хийхэд зориулж дэлгэцийг (UI) бэлтгэнэ.
        searchView.clearSearch();
        renderLoader(elements.searchResultDiv);
        // 4) Хайлтыг гүйцэтгэнэ.
        await state.search.doSearch()
        // 5) Хайлтын үр дүнг дэлгэцэнд үзүүлнэ.
        clearLoader();
        if(state.search.result === undefined) alert("Хайлт илэрцгүй байна")
        else searchView.renderRecipes(state.search.result);
    }
};

elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});
elements.pageButtons.addEventListener("click", e => {
    const btn = e.target.closest(".btn-inline");

    if(btn){
        const gotoPageNomber = parseInt(btn.dataset.goto, 10);
        searchView.clearSearch();
        searchView.renderRecipes(state.search.result, gotoPageNomber);
    }
})

const controleRecipe = async () => {
    // 1) URL - аас ID - г салгаж авна
     const id = window.location.hash.replace("#", "");

    // 2) Жорын моделыг үүсгэж өгнө
     state.recipe = new Recipe(id);

    // 3) UI дэлгэцийг бэлтгэж өгнө
     clearRecipe();
     renderLoader(elements.recipeDiv);

    // 4) Жороо татаж авна
    await state.recipe.getRecipe();

    // 5) Жорын гүйцэтгэх хугацаа болон орцыг тооцоолно
    state.recipe.calcTime();
    state.recipe.calcHuniiToo();
    clearLoader();

    // 6) Жороо дэлгэцэнд үзүүлнэ
     rendRec(state.recipe);
}
window.addEventListener("hashchange", controleRecipe);
window.addEventListener("load", controleRecipe);