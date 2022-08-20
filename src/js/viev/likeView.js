
export const toggleLikeBtn = isliked => {
    const iconString = isliked? "icon-heart" : "icon-heart-outlined"

    document.querySelector(".recipe__love use").setAttribute("href", `img/icons.svg#${iconString}`)
}