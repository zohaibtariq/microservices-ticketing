import express, {Request, Response} from 'express'
import {body} from 'express-validator'
import {validateRequest} from "./middlewares/validate-request";
import {User} from "./models/user";
import {BadRequestError} from "./errors/bad-request-error";
import {Password} from "./services/password";
import jwt from "jsonwebtoken";
const router = express.Router()

router.post('/api/users/signin', [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('Enter password'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const {email, password} = req.body
        const existingUser = await User.findOne({email})
        if(!existingUser)
            throw new BadRequestError('Invalid Credentials')
        const passMatch = await Password.compare(existingUser.password, password)
        if(!passMatch)
            throw new BadRequestError('Invalid Credentials')
        // generate jwt
        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email,
        }, process.env.JWT_KEY!)
        // store it on session object
        req.session = {
            jwt: userJwt
        }
        // throw new DatabaseConnectionError()
        // throw new Error('Error in connecting database')
        res.status(200).send(existingUser)
    }
)

export {router as signinRouter}