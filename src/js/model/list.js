import uniqid from 'uniqid'
export default class List {

    constructor(){
        this.item = [];
    }
    deleteItem(id){
       const index = this.item.findIndex(el => el.id === id);

        this.item.splice(index, 1)
    }
    addItem(item){
        let newItem = {
            id: uniqid(),
            item
        }
        this.item.push(newItem);       
        return newItem;
    };
}