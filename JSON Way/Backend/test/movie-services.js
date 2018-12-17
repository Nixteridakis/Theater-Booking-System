import test from 'ava'
import request from 'supertest'
import app from '../app'

//MOVIE SERVICES

test('See list of movies', async t =>{
    const createMovie = {
        name: 'Titans', 
        price: 8,
        attendees: []
    }

    const creation = await request(app)
    .post('/movie')
    .send(createMovie)

    const list = await request(app).get('/movies')

    t.is(list.status, 200)
    t.true(Array.isArray(list.body))
    t.true(list.body.length > 0)
})

test('Add a movie', async t => {
    const movieTitans = {
        name: 'Titans', 
        price: 8,
        attendees: []
    }

    const createTitans = await request(app).post('/movie').send(movieTitans)

    t.is(createTitans.status, 200)
    t.is(createTitans.body.name, movieTitans.name)    
    t.is(createTitans.body.price, movieTitans.price)
    t.deepEqual(createTitans.body.attendees, movieTitans.attendees)    
})

test('Fetch a movie', async t => {
    const movieTitans = {
        name: 'Titans', 
        price: 8,
        attendees: []
    }

    const createTitans = await request(app).post('/movie').send(movieTitans)
    const fetchTitans = await request(app).get(`/movie/${createTitans.body._id}`)

    t.is(fetchTitans.status, 200)
    t.is(fetchTitans.body.name, movieTitans.name)
    t.is(fetchTitans.body.price, movieTitans.price)
})

test('Delete a movie', async t => {
    const movieTitans = {
        name: 'Titans', 
        price: 8,
        attendees: []
    }

    const createTitans = await request(app).post('/movie').send(movieTitans)
    const deleteTitans = await request(app).delete(`/movie/${createTitans.body._id}`)

    t.is(deleteTitans.status, 200)
    
    const fetchTitans = await request(app).get(`/movie/${createTitans.body._id}/json`)

    t.is(fetchTitans.status, 404)
})

test('Add a person to the movie', async t => {
    const movieTitans = {
        name: 'Titans', 
        price: 8,
        attendees: []
    }

    const personJohn = {
        name: 'Johni',
        age: 33,
        shopped : []
    }

    const createTitans = await request(app).post('/movie').send(movieTitans)
    const createJohn = await request(app).post('/person').send(personJohn)
    const addPerson = await request(app).post(`/movie/${createTitans.body._id}/addPerson`).send({personId : createJohn.body._id})
    t.is(addPerson.status, 200)
    t.is(addPerson.body.attendees[0]._id, createJohn.body._id)
    t.deepEqual(addPerson.body.attendees[0], createJohn.body)
})