import express from 'express'
import 'express-async-errors'
import {json} from 'body-parser'
import cookieSession from 'cookie-session'

import {currentUserRouter} from './routes/current-user'
import {signinRouter} from './routes/signin'
import {signoutRouter} from './routes/signout'
import {signupRouter} from './routes/signup'

import {errorHandler} from '@microservices-ticketing/common'
// import {errorHandler, NotFoundError} from '@microservices-ticketing/common'

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
    secure: process.env.NODE_ENV !== 'test'
}))
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.use(errorHandler)

export {app}