import test from 'ava'
import request from 'supertest'
import app from '../app'



//PERSON SERVICES

test('See list of persons', async t =>{
    const newPerson = {
        name:'Cola', 
        age:33, 
        shopped:[]
    }

    const creation = await request(app)
    .post('/person')
    .send(newPerson)

    const people = await request(app).get('/people')

    t.is(people.status, 200)
    t.true(Array.isArray(people.body))
    t.true(people.body.length > 0)
})

test('Create a person', async t => {
    const newPerson = {
        name:'Cola', 
        age:33, 
        shopped:[]
    }

    const creation = await request(app)
    .post('/person')
    .send(newPerson)

    t.is(creation.status, 200)
    t.is(newPerson.name, creation.body.name)
    t.is(newPerson.age, creation.body.age)
    t.deepEqual(newPerson.shopped, creation.body.shopped)
})

test('Fetch a person', async t => {
    const newPerson = {
        name:'Cola', 
        age:33, 
        shopped:[]
    }

    const creation = await request(app)
    .post('/person')
    .send(newPerson)

    const fetchPerson = await request(app)
    .get(`/person/${creation.body._id}`)

    t.is(fetchPerson.status, 200)
    t.deepEqual(creation.body, fetchPerson.body)
})

test('Delete a person', async t => {
    const newPerson = {
        name:'Cola', 
        age:33, 
        shopped:[]
    }

    const creation = await request(app)
    .post('/person')
    .send(newPerson)

    const deletePerson = await request(app).delete(`/person/${creation.body._id}`)

    t.is(deletePerson.status, 200)

    const fetchPerson = await request(app).get(`/person/${creation.body._id}/json`)

    t.is(fetchPerson.status, 404)
})

test('Add item to the person', async t => {
    const newPerson = {
        name:'Kostas', 
        age:33, 
        shopped:[]
    }

    const newItem = {
        name: 'Chocolate',
        price: 3
    }

    const createPerson = await request(app)
    .post('/person')
    .send(newPerson)

    const createItem = await request(app)
    .post('/item')
    .send(newItem)

    const addItem = await request(app)
    .post(`/person/${createPerson.body._id}/add-item`)
    .send({itemId : createItem.body._id})

    t.is(addItem.status, 200 )
    t.is(addItem.body.shopped[0]._id, createItem.body._id)
    t.deepEqual(addItem.body.shopped[0], createItem.body)

})
