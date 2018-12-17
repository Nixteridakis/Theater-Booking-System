import test from 'ava'
import request from 'supertest'
import app from '../app'

test('See list of shop items', async t =>{
    const createChocolate = {name: 'Chocolate', price: 8}

    const creation = await request(app)
    .post('/item')
    .send(createChocolate)

    const res = await request(app).get('/shop')

    t.is(res.status, 200)
    t.true(Array.isArray(res.body),'Body is array')
    t.true(res.body.length > 0)
})


test('Create new Item', async t =>{
    const createChocolate = {name: 'Chocolate', price: 8}

    const res = await request(app)
    .post('/item')
    .send(createChocolate)

    t.is(res.status, 200)
    t.is(res.body.name, createChocolate.name)
    t.is(res.body.price, createChocolate.price)
})

test('Fetch a shop Item', async t =>{
    const createChocolate = {name: 'Chocolate', price: 8}

    const res = await request(app)
    .post('/item')
    .send(createChocolate)

    const fetchRes = await request(app).get(
        `/item/${res.body._id}`
        )

    const chocolateFetched = fetchRes.body

    t.is(fetchRes.status, 200)
    t.deepEqual(res.body,chocolateFetched)
})

test('Delete an Item', async t =>{
    const createChocolate = {name: 'Chocolate', price: 8}

    const createdChocolate = await request(app)
    .post('/item')
    .send(createChocolate)

    const deleteChocolate = await request(app)
    .delete(`/item/${createdChocolate.body._id}`)

    t.is(deleteChocolate.status, 200)

    const fetch = await request(app).get(`/item/${createdChocolate.body._id}/json`)

    t.is(fetch.status, 404);

})