import {MongoMemoryServer} from "mongodb-memory-server"
import mongoose from "mongoose"
// import {app} from "../app"
// import request from "supertest"

// declare global {
//     namespace NodeJS {
//         interface Global {
//             signin(): Promise<string[]>
//         }
//     }
// }

let mongo: any

beforeAll(async () => {
    process.env.JWT_KEY = 'SDGSDFGsdfg35534SDf5'; // Random Key
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri)
})

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for(let collection of collections){
        await collection.deleteMany({})
    }
})

afterAll(async () => {
    await mongo.stop()
    await mongoose.connection.close()
})

// global.signin = async () => {
//     const email = 'test@test.com'
//     const password = 'p@sswOrd123'
//     const response = await request(app)
//         .post('/api/users/signup')
//         .send({
//             email, password
//         })
//         .expect(201)
//     console.log(response.get('Set-Cookie'))
//     return response.get('Set-Cookie')
// }