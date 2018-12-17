const fs = require ('fs')
const {parse, stringify} = require('flatted/cjs')

const PersonModel = require ('../models/person')
const ShopModel = require ('../models/shop')

async function add(person){
    return PersonModel.create(person)
} 

async function addItem(personId, itemId){
    const person = await PersonModel.findOne({ _id: personId})
    const item = await ShopModel.findOne({ _id: itemId})
    person.shopped.push(item)
    await person.save()
    return person
}

async function findAll(){
    return PersonModel.find().populate('shopped')
} 

async function loadById(personId){
    return PersonModel.findOne({ _id: personId }).populate('shopped')
}   

async function deletePerson(personId){
   return PersonModel.remove({_id: personId})
}   

async function deleteAll(){
    return PersonModel.remove()
}
   
module.exports = {
    add,
    addItem,
    findAll,
    loadById,
    deletePerson,
    deleteAll
}
