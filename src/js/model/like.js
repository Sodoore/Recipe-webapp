export default class Like{
    constructor(){
        this.like = [];
    }
    addLike(id, title, publisher, img, ){
        const like = { id, title, publisher, img}

        this.like.push(like);
        return like;
    }
    deleteLike(id){
        // id гэдэг ID тай like - ийн индексийг массиваас хайж олно.
        const index = this.like.findIndex(el => el.id === id);

        // Уг индекс дээрх элэментиг массиваас устганна.
        this.like.splice(index, 1)

        // Likelagdsan esehiig shalgadag function
    }
    isLiked(id) {
        // if(this.like.findIndex(el => el.id ===id) === -1) return false;
        // else return true;
        return this.like.findIndex(el => el.id === id) !== -1 ;
    }
    getNumberOfLikes(){
        return this.like.length;
    }
}