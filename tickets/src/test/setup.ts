import {MongoMemoryServer} from "mongodb-memory-server"
import mongoose from "mongoose"
import jwt from 'jsonwebtoken';

declare global {
    var signin: () => string[];
}

let mongo: any

beforeAll(async () => {
    process.env.JWT_KEY = 'Y6WTFKZICYR7QWU1BXGWGZV2PWL9OFME6KX7O7E4BLATNVANRAC5D7UESZIXCWTIFSFBBLX3N00YNREB998428GOB8OQZIKYNYBU'; // Random Key
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

global.signin = () => {
    const payload = {
        id: 'randomIdFk3',
        email: 'test@test.com'
    }
    const token = jwt.sign(payload, process.env.JWT_KEY!);
    const session = {jwt: token}
    const sessionJSON = JSON.stringify(session)
    const base64 = Buffer.from(sessionJSON).toString('base64')
    // return [`express:sess=${base64}`]
    return [`session=${base64}`] // check your browser cookie format in authenticated request in response header
}