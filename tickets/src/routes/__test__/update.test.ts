import request from 'supertest'
import {app} from '../../app'
import {generateRandomString, generateRandomInteger} from '@microservices-ticketing/common'
import mongoose from 'mongoose'

it('returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    const title = generateRandomString(10)
    const price = generateRandomInteger(2, 3)
    const response = await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({title: title, price: price})
        .expect(404)
})

it('returns a 401 if the user does not own the ticket', async () => {
    const title = generateRandomString(10)
    const price = generateRandomInteger(2, 3)
    const response = await request(app)
        .post(`/api/tickets/`)
        .set('Cookie', global.signin())
        .send({title: title, price: price})
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({title: title+' updated', price: price})
        .expect(401)
})

it('return a 400 if the user provides an invalid title or price', async () => {
    const title = generateRandomString(10)
    const price = generateRandomInteger(2, 3)
    const cookie = global.signin()
    const response = await request(app)
        .post(`/api/tickets/`)
        .set('Cookie', cookie)
        .send({title: title, price: price})

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({title: '', price: 20})
        .expect(400)

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({title: title+' valid', price: -10})
        .expect(400)

})

it('updates the ticket provided valid inputs', async () => {
    const title = generateRandomString(10)
    const price = generateRandomInteger(2, 3)
    const cookie = global.signin()
    const response = await request(app)
        .post(`/api/tickets/`)
        .set('Cookie', cookie)
        .send({title: title, price: price})

    const updated = await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({title: 'valid title', price: 9999})
        .expect(200)

    const getResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send()

    expect(getResponse.body.title).toEqual('valid title')
    expect(getResponse.body.price).toEqual(9999)
})