import {app} from "./app";
import mongoose from 'mongoose'

const start = async () => {
    if(!process.env.JWT_KEY)
        throw new Error('JWT_KEY must be defined.')
    try{
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
        console.log('Connected to mongodb.')
    } catch (e) {
        console.error(e)
    }
    const port = 3000
    app.listen(port, () => {
        console.log(`Auth Service Listening On Port : ${port}`)
    })
}
start()