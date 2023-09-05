import express from 'express'
import {json} from 'body-parser'

import {currentUserRouter} from "./current-user"
import {signinRouter} from "./signin"
import {signoutRouter} from "./signout"
import {signupRouter} from "./signup"
import {errorHandler} from "./middlewares/error-handler";

const app = express()

app.use(json())
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.use(errorHandler)

const port = 3000

app.listen(port, () => {
    console.log(`Auth Service Listening On Port : ${port}`)
})