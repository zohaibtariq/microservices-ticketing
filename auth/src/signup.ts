import express, {Request, Response} from 'express'
import {body, validationResult} from 'express-validator'
import jwt from 'jsonwebtoken'
import {RequestValidationError} from './errors/request-validation-error'
import {User} from './models/user'
import {BadRequestError} from './errors/bad-request-error'
// import {DatabaseConnectionError} from './errors/database-connection-error'

const router = express.Router()

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({min:4, max:20})
        .withMessage('Password must be between 4 and 20 characters')
], async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        throw new RequestValidationError(errors.array())
        // throw new Error('Inv email')
        // return res.status(400).send(errors.array())
    }
    const {email, password} = req.body
    const existingUser = await User.findOne({email})
    if(existingUser){
        console.log('Email in use')
        throw new BadRequestError('Email already in use.')
        // return res.status(403).send({})
    }
    console.log('Creating a user')
    const user = User.build({email, password})
    await user.save()
    // generate jwt
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email,
    }, process.env.JWT_KEY!)
    // store it on session object
    req.session = {
        jwt: userJwt
    }
    // throw new DatabaseConnectionError()
    // throw new Error('Error in connecting database')
    res.status(201).send(user)
})

export {router as signupRouter}