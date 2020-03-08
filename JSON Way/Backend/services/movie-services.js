const fs = require ('fs')
const {parse, stringify} = require('flatted/cjs')

const Movie = require ('../models/movie')
const Person = require ('../models/person')

async function loadMovie(file){
    return new Promise((resolve,reject) => {
        fs.readFile(`./movie_${file}.json`, 'utf8' , (err,file) => {
            if (err) throw err
            const data = parse(file)
            const movie = Movie.create(data)
          resolve (movie)
        })
    })
}   

async function loadPerson(movie, person){
    const curr_movie = await loadMovie(movie)
    const curr_person = curr_movie.audience[person-1]
    return curr_person
}   

async function addPerson(movie, person){
    const curr_movie = await loadMovie(movie)
    const last_person = curr_movie.audience[curr_movie.audience.length-1]
    const last_id = last_person.id && last_person.id || 0
    person.id = last_id + 1

    const newPerson = Person.create(person)
    curr_movie.audience.push(newPerson)
    await save(curr_movie)
    return curr_movie
}   

async function del(movie, personId){
   const curr_movie = await loadMovie(movie)
   const personIndex = curr_movie.audience.findIndex((index)=> index.id == personId)
   curr_movie.audience.splice(personIndex, 1)
   
   save(curr_movie)
}

async function save(data){
    return new Promise((resolve, reject) => {
        let path = `movie_${data.name}.json`
        fs.writeFile(`${path}`,stringify(data),(err) => {
            if (err) throw err
            })
    })        
}