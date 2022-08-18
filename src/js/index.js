import axios from 'axios';
import Search from './model/search';
import { elements, renderLoader, clearLoader} from './viev/base';
import * as searchView from './viev/searchView';

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
})