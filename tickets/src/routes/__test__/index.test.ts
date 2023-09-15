import request from "supertest";
import {app} from '../../app'
import {generateRandomString, generateRandomInteger} from '@microservices-ticketing/common'

const createTicket = () => {
    const title = generateRandomString(10)
    const price = generateRandomInteger(2, 3)
    return request(app)
        .post(`/api/tickets/`)
        .set('Cookie', global.signin())
        .send({
            title, price
        })
}

it('can fetch a list of tickets', async () => {
    await createTicket();
    await createTicket();
    await createTicket();
    const response = await request(app)
        .get(`/api/tickets/`)
        .send()
    expect(response.body.length).toEqual(3)
})