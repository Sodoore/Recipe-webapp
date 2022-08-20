import { elements } from "./base"

export const toggleLikeBtn = isliked => {
    const iconString = isliked? "icon-heart" : "icon-heart-outlined"

    document.querySelector(".recipe__love use").setAttribute("href", `img/icons.svg#${iconString}`)
}

export const toglleLikeMenu = likenum => {
    elements.likesMenu.style.visibility = likenum > 0 ? "visible" : "hidden";
};

export const renderLike = newLike =>{
    const html = `<li>
    <a class="likes__link" href="#${newLike.id}">
        <figure class="likes__fig">
            <img src="${newLike.img}" alt="Test">
        </figure>
        <div class="likes__data">
            <h4 class="likes__name">${newLike.title}</h4>
            <p class="likes__author">${newLike.publisher}</p>
        </div>
    </a>
</li>`;
elements.likeList.insertAdjacentHTML("beforeend", html)
};

export const deleteLikes = (id) =>{
   const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
   if(el) el.parentElement.removeChild(el);
}