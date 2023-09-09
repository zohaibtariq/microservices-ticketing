import request from "supertest";
import {app} from '../../app'

it('clears the cookie after signing out', async () => {
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
        .post('/api/users/signout')
        .send({})
        .expect(200)
    // console.log(response.get('Set-Cookie'))
    expect(response.get('Set-Cookie')[0]).toEqual(
        'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
    )
})