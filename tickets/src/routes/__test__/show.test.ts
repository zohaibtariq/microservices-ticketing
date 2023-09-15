import request from "supertest";
import {app} from '../../app'
import {generateRandomString, generateRandomInteger} from '@microservices-ticketing/common'
import {Ticket} from "../../models/tickets";
import mongoose from "mongoose";

it('returns a 404 if the ticket is not found', async() => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .get(`/api/tickets/${id}`)
        .send()
        .expect(404)
})

it('returns the ticket if the ticket is found', async() => {
    let tickets = await Ticket.find({})
    expect(tickets.length).toEqual(0)
    const title = generateRandomString(10)
    const price = generateRandomInteger(2, 3)
    const ticketStoreResponse = await request(app).post('/api/tickets')
        .set('Cookie', global.signin())
        .send({title: title, price: price})
    expect(201)
    const ticketFetchResponse = await request(app).get(`/api/tickets/${ticketStoreResponse.body.id}`)
        .set('Cookie', global.signin())
        .send()
    expect(200)
    expect(ticketFetchResponse.body.title).toEqual(title)
    expect(ticketFetchResponse.body.price).toEqual(price)
})