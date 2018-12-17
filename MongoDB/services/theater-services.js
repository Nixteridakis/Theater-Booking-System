const fs = require ('fs')
const {parse, stringify} = require('flatted/cjs')

const TheaterModel = require ('../models/theater')
const MovieModel = require ('../models/movie')

async function add(theater){
    return TheaterModel.create(theater)
} 

async function addMovie(theaterId, movieId){
    const theater = await TheaterModel.findOne({ _id: theaterId })
    const movie = await MovieModel.findOne({ _id: movieId })

    theater.movies.push(movie)
    await theater.save()
    return theater
}

async function findAll(){
    return TheaterModel.find().populate('movies')
} 

async function loadById(theaterId){
    return TheaterModel.findOne({ _id: theaterId }).populate('movies')
}   

async function deleteTheater(theaterId){
   return TheaterModel.remove({_id: theaterId})
}   
async function deleteAll(){
    return TheaterModel.remove()
 }   

module.exports = {
    add,
    addMovie,
    findAll,
    loadById,
    deleteAll,
    deleteTheater
}
