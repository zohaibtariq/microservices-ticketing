import request from "supertest";
import {app} from "../../app";

it('fails when email is missing', async () => {
     await request(app)
        .post('/api/users/signin')
        .send({
            email: 'invalid@valid.com',
            password: 'asd123ads@D',
        })
        .expect(400)
})

it('fails with an incorrect password', async () => {
    const email = 'validemail@domain.com'
    const pass = 'aA213sdf$sdf'
    await request(app)
        .post('/api/users/signup')
        .send({
            email: email,
            password: pass,
        })
        .expect(201)
    await request(app)
        .post('/api/users/signin')
        .send({
            email: email,
            password: pass+'wrong',
        })
        .expect(400)
})

it('responds with a cookie when signup with valid credentials', async () => {
    const email = 'validemail@domain.com'
    const pass = 'aA213sdf$sdf'
    await request(app)
        .post('/api/users/signup')
        .send({
            email: email,
            password: pass,
        })
        .expect(201)
    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: email,
            password: pass,
        })
        .expect(200)
    expect(response.get('Set-Cookie')).toBeDefined()
})