const ShopModel = require ('../models/shop')

async function add(item){
    return ShopModel.create(item)
} 

async function findAll(){
    return ShopModel.find()
} 

async function loadById(itemId){
    return ShopModel.findOne({ _id: itemId })
}   

async function deleteItem(itemId){
   return ShopModel.remove({_id: itemId})
}   

async function deleteAll(){
    return ShopModel.remove()
 }   


module.exports = {
    add,
    findAll,
    loadById,
    deleteItem,
    deleteAll
}
