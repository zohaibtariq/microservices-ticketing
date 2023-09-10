import {app} from "./app";
import mongoose from 'mongoose'

const start = async () => {
    if(!process.env.JWT_KEY)
        throw new Error('JWT_KEY must be defined.')
    if(!process.env.MONGO_URI)
        throw new Error('MONGO_URI must be defined.')
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Tickets Service ::: Connected to mongodb.')
    } catch (e) {
        console.error(e)
    }
    const port = 3000
    app.listen(port, () => {
        console.log(`Tickets Service ::: Listening On Port : ${port}`)
    })
}
start()