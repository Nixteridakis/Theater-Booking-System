import test from 'ava'
import request from 'supertest'
import app from '../app'

//Theater Services
test('See list of theaters', async t =>{
    const newTheater = {
        name: 'Max', 
        totalSales: 130,
        movies: []
    }

    const creation = await request(app)
    .post('/theater')
    .send(newTheater)

    const theatersList = await request(app).get('/theaters')

    t.is(theatersList.status, 200)
    t.true(Array.isArray(theatersList.body))
    t.true(theatersList.body.length > 0)
})

test('Create a theater', async t => {
    const newTheater = {
        name: 'Max', 
        totalSales: 130,
        movies: []
    }

    const creation = await request(app)
    .post('/theater')
    .send(newTheater)

    t.is(creation.status, 200)
    t.is(newTheater.name, creation.body.name)
    t.is(newTheater.age, creation.body.age)
    t.deepEqual(newTheater.movies, creation.body.movies)
})

test('Fetch a theater', async t => {
    const newTheater = {
        name: 'Max', 
        totalSales: 130,
        movies: []
    }

    const creation = await request(app)
    .post('/theater')
    .send(newTheater)

    const fetchTheater = await request(app)
    .get(`/theater/${creation.body._id}`)


    t.is(fetchTheater.status, 200)
    t.deepEqual(creation.body, fetchTheater.body)
})

test('Delete a theater', async t => {
    const newTheater = {
        name: 'Max', 
        totalSales: 130,
        movies: []
    }

    const creation = await request(app)
    .post('/theater')
    .send(newTheater)

    const deleteTheater = await request(app)
    .delete(`/theater/${creation.body._id}`)

    const fetchTheater = await request(app)
    .get(`/theater/${creation.body._id}/json`)
    
    t.is(deleteTheater.status, 200)
    t.is(fetchTheater.status, 404)

})

test('Add a movie to a theater', async t => {
    const newTheater = {
        name: 'Max', 
        totalSales: 130,
        movies: []
    }
    
    const newTitans = {
        name: 'Titans', 
        price: 8,
        attendees: []
    }

    const createMovie = await request(app)
    .post('/movie')
    .send(newTitans)

    const createTheater = await request(app)
    .post('/theater')
    .send(newTheater)

    const addMovie = await request(app)
    .post(`/theater/${createTheater.body._id}/add-movie`)
    .send({movieId : createMovie.body._id})
    
    t.is(addMovie.status, 200)

})