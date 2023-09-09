import request from "supertest";
import {app} from "../../app";

it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '12324534sd#@D342'
        }).expect(201)
})

it('returns a 400 with an invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'invalid@i.c',
            password: 'passwoD12&'
        })
        .expect(400)
})

it('returns a 400 with an invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'invalid@valid.com',
            password: 'p'
        })
        .expect(400)
})

it('returns a 400 with missing email and password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({})
        .expect(400)
})

it('returns a 400 with missing email or password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'invalid@valid.com',
        })
        .expect(400)
    await request(app)
        .post('/api/users/signup')
        .send({
            password: 'asd123ads@D',
        })
        .expect(400)
})

it('disallows duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'invalid@valid.com',
            password: 'asd123ads@D',
        })
        .expect(201)
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'invalid@valid.com',
            password: 'asd123ads@D',
        })
        .expect(400)
})

it('it sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'invalid@valid.com',
            password: 'asd123ads@D',
        })
        .expect(201)
    expect(response.get('Set-Cookie')).toBeDefined()
})