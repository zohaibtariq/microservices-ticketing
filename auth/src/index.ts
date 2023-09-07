import express from 'express'
import 'express-async-errors'
import {json} from 'body-parser'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'

import {currentUserRouter} from './current-user'
import {signinRouter} from './signin'
import {signoutRouter} from './signout'
import {signupRouter} from './signup'

import {errorHandler} from './middlewares/error-handler'
// import {NotFoundError} from './errors/not-found-error'

const app = express()
app.set('trust proxy', true)
// app.all('*', async () => {
//     throw new NotFoundError()
// })

// no need to call async with next due to use of express-async-errors now we can directly throw errors from async func as well
// app.all('*', async (req, res, next) => {
//     next(throw new NotFoundError())
// })

app.use(json())
app.use(cookieSession({
    signed: false,
    secure: true
}))
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.use(errorHandler)

const start = async () => {
    if(!process.env.JWT_KEY)
        throw new Error('JWT_KEY must be defined.')
    try{
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
        console.log('Connected to mongodb.')
    }catch (e) {
        console.error(e)
    }
    const port = 3000
    app.listen(port, () => {
        console.log(`Auth Service Listening On Port : ${port}`)
    })
}
start()