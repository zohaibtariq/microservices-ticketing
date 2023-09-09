import request from "supertest";
import {app} from '../../app'

it('responds with details about the current user', async () => {
    const email = 'validemail@domain.com'
    const pass = 'aA213sdf$sdf'
    const authResponse = await request(app)
        .post('/api/users/signup')
        .send({
            email: email,
            password: pass,
        })
        .expect(201)

    // const cookie = await global.signin();
    const cookie = authResponse.get('Set-Cookie')

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send({})
        .expect(200)

    expect(response.body.currentUser.email).toEqual(email)
})
it('responds with null if not authenticated', async () => {
    const response = await request(app)
        .get('/api/users/currentuser')
        .send({})
        .expect(200)

    expect(response.body.currentUser).toEqual(null)
})