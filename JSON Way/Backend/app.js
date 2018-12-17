const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const movieService = require('./services/movie-services')
const personService = require('./services/person-services')
const shopService = require('./services/shop-services')
const theaterService = require('./services/theater-services')

const app = express()

app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.render('index')
})

//theather requests

app.post('/theater', async (req, res) => {
    const theater = await theaterService.add(req.body)
    res.send(theater)
})

app.get('/theaters', async (req, res) => {
    const theater = await theaterService.findAll()
    res.send(theater)
})
  
app.get('/theater/:id', async (req, res) => {
    const theater = await theaterService.loadById(req.params.id)
    res.send(theater)
})

app.delete('/theater/:id', async (req, res) => {
    const theater = await theaterService.deleteTheater(req.params.id)
    res.send(theater)
})

app.delete('/theaters/', async (req, res) => {
    const theaters = await theaterService.deleteAll()
    res.send(theaters)
})

//movie requests

app.post('/movie', async (req, res) => {
    const movie = await movieService.addMovie(req.body)
    res.send(movie)
  })

app.get('/movies', async (req, res) => {
    const movies = await movieService.findAll()
    res.send(movies)
})
  
app.get('/movie/:id', async (req, res) => {
    const movie = await movieService.loadById(req.params.id)
    res.send(movie)
})

app.delete('/movie/:id', async (req, res) => {
    const movie = await movieService.deleteMovie(req.params.id)
    res.send(movie)
})

app.delete('/movies', async (req, res) => {
    const movie = await movieService.deleteAll()
    res.send(movie)
})

//person requests

app.post('/person', async (req, res) => {
    const person = await personService.add(req.body)
    res.send(person)
})

app.get('/people', async (req, res) => {
    const people = await personService.findAll()
    res.send(people)
})
  
app.get('/person/:id', async (req, res) => {
    const person = await personService.loadById(req.params.id)
    res.send(person)
})

app.delete('/person/:id', async (req, res) => {
    const person = await personService.deletePerson(req.params.id)
    res.send(person)
})

app.delete('/people', async (req, res) => {
    const person = await personService.deleteAll()
    res.send(person)
})


//shop requests

app.post('/item', async (req, res) => {
    const item = await shopService.add(req.body)
    res.send(item)
})

app.get('/shop', async (req, res) => {
    const shop = await shopService.findAll()
    res.send(shop)
})
  
app.get('/item/:id', async (req, res) => {
    const item = await shopService.loadById(req.params.id)
    res.send(item)
})

app.delete('/item/:id', async (req, res) => {
    const item = await shopService.deleteItem(req.params.id)
    res.send(item)
})

app.delete('/shop', async (req, res) => {
    const item = await shopService.deleteAll()
    res.send(item)
})

// interaction between schemas

//add person to a movie
app.post('/movie/:id/addPerson', async (req, res) => {
    const movie = await movieService.addPerson(req.params.id, req.body.personId)
    res.send(movie)
})

//item shopped a person
app.post('/person/:id/add-item', async (req, res) => {
    const person = await personService.addItem(req.params.id, req.body.itemId)
    res.send(person)
})

//theater add movie
app.post('/theater/:id/add-movie', async (req, res) => {
    const theater = await theaterService.addMovie(req.params.id, req.body.movieId)
    res.send(theater)
})

module.exports = app

/* Does not work

app.get('/movie/name/:name', async (req, res) => {
    const movie = await movieService.loadByName(req.params.id)
    res.send(movie)
})
*/

//axios.post('/movie-Titans/people',{name:'Jim',age:33}).then(res=>console.log(res.data))
// axios.delete('/movie-Titans/people/3').then(res=>console.log(res))