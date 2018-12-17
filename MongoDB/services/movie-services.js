const MovieModel = require ('../models/movie')
const PersonModel = require ('../models/person')

async function addMovie(movie){
    return MovieModel.create(movie)
} 

async function addPerson(movieId, personId){
    const movie = await MovieModel.findOne({ _id: movieId })
    const person = await PersonModel.findOne({ _id: personId })

    movie.attendees.push(person)

    await movie.save()
    return movie
} 

async function findAll(){
    return MovieModel.find().populate('attendees')
} 

async function loadById(movieId){
    return MovieModel.findOne({ _id: movieId }).populate('attendees')
}   

async function deleteMovie(movieId){
   return MovieModel.remove({_id: movieId})
}   

async function deleteAll(){
    return MovieModel.remove()
 }   


module.exports = {
    addMovie,
    addPerson,
    findAll,
    loadById,
    deleteMovie,
    deleteAll
}

