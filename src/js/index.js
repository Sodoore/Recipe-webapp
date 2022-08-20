import axios from 'axios';
import Search from './model/search';
import { elements, renderLoader, clearLoader} from './viev/base';
import * as searchView from './viev/searchView';
import Recipe from './model/recipe';
import list from './model/list';
import * as listView from './viev/listView';
import Like from './model/like';
import {clearRecipe, rendRec, highligthSelectedRecipe} from './viev/recipeView';
import * as likeView from './viev/likeView';

/**
 * Web app төлөв
 * Хайлтын query, үр дүн
 * Тухайн үзүүлж баыгаа жор
 * Лайкласан жор
 * Захиалж байгаа жорын орц
 */

const state = {};
likeView.toglleLikeMenu(0);


/**
 * Хайлтын контроллер
 */
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



/**
 * Жорын контроллер
 */
const controleRecipe = async () => {
    // 1) URL - аас ID - г салгаж авна
     const id = window.location.hash.replace("#", "");
     if(!state.like)state.like = new Like();

   if(id){
     // 2) Жорын моделыг үүсгэж өгнө
     state.recipe = new Recipe(id);

    // 3) UI дэлгэцийг бэлтгэж өгнө
     clearRecipe();
     renderLoader(elements.recipeDiv);
     highligthSelectedRecipe(id);

    // 4) Жороо татаж авна
    await state.recipe.getRecipe();

    // 5) Жорын гүйцэтгэх хугацаа болон орцыг тооцоолно
    state.recipe.calcTime();
    state.recipe.calcHuniiToo();
    clearLoader();

    // 6) Жороо дэлгэцэнд үзүүлнэ
     rendRec(state.recipe, state.like.isLiked(id));
   }
}
["hashchange", "load"].forEach(e => window.addEventListener(e , controleRecipe));


/**
 * Найрлаганы контроллер
 */
const  controlList = () => {
    // 1) Найрлаганы моделыг.
    state.list = new list();

    // найрлагыг цэвэрлэх 
    listView.clearItem();

    // 2) Бүх найрлагаа найрлаганы модел руу хиийнэ.
    state.recipe.ingredients.forEach( n => {
        // Тухайн найралгыг модел руу нэмнэ.
        const item = state.list.addItem(n);

        // Найрлагыг дэлгэцэнд гаргана
        listView.renderItem(item);
    
    });
};

/**
 * Controle like
 */
const controlLike = () =>{
    // 1) Like aa hadgalah Modeliig uusgene;
    if(!state.like)state.like = new Like();

    // 2) Odoo haragdaj baigaa joriin modeliig olj awna;
    const currentRecipeId = state.recipe.id
    // 3) Ene Likelagdsan esehiig shalgana
    if(state.like.isLiked(currentRecipeId)){
        //  likelsan bol deer n darahad like iig n boliulna
        state.like.deleteLike(currentRecipeId);
        likeView.toggleLikeBtn(false)
        likeView.deleteLikes(currentRecipeId);
    }else{
       //  Likelaagui bol likelna
       const newLike = state.like.addLike(currentRecipeId, state.recipe.title, state.recipe.publisher, state.recipe.img_url);
       likeView.renderLike(newLike);
       likeView.toggleLikeBtn(true)
    }
    likeView.toglleLikeMenu(state.like.getNumberOfLikes());
}

elements.recipeDiv.addEventListener("click", e => {

    if(e.target.matches(".recipe__btn, .recipe__btn *")){
        controlList();

    } else if ( e.target.matches(".recipe__love, .recipe__love *") ){
        controlLike();
    }
});

elements.shoppingList.addEventListener("click", e => {
        const id = e.target.closest(".shopping__item").dataset.itemid;
        // modeloos ustgah
    state.list.deleteItem(id);

    // Delgetsnees ustgana;
    listView.deleteItem(id);
})