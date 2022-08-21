export default class Like{
    constructor(){
        this.readDataFromLocalStorage();
        if(!this.like)this.like = [];
    }
    addLike(id, title, publisher, img, ){
        const like = { id, title, publisher, img}

        this.like.push(like);
        this.saveDataToLocalStorage();
        return like;
    }
    deleteLike(id){
        // id гэдэг ID тай like - ийн индексийг массиваас хайж олно.
        const index = this.like.findIndex(el => el.id === id);

        // Уг индекс дээрх элэментиг массиваас устганна.
        this.like.splice(index, 1)
        this.saveDataToLocalStorage();
    }
    // Likelagdsan esehiig shalgadag function
    isLiked(id) {
        // if(this.like.findIndex(el => el.id ===id) === -1) return false;
        // else return true;
        return this.like.findIndex(el => el.id === id) !== -1 ;
    }
    getNumberOfLikes(){
        return this.like.length;
    }

    saveDataToLocalStorage(){
        localStorage.setItem("likes", JSON.stringify(this.like));
    };

    readDataFromLocalStorage(){
       this.like = JSON.parse( localStorage.getItem("likes") ) ;
    }
}