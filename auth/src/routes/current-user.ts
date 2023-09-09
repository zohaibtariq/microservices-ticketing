import express, {Request, Response} from 'express'
// import jwt from 'jsonwebtoken'
import {currentUser} from "../middlewares/current-user";
// import {requireAuth} from "./middlewares/require-auth";
const router = express.Router()

// router.get('/api/users/currentuser', currentUser, requireAuth, (req: Request, res: Response) => {
router.get('/api/users/currentuser', currentUser, (req: Request, res: Response) => {
    res.send({currentUser: req.currentUser || null})
    // if(!req.session?.jwt)
    //     return res.send({currentUser: null})
    // try{
    //     const payload = jwt.verify(
    //         req.session.jwt,
    //         process.env.JWT_KEY!
    //     )
    //     return res.send({currentUser: payload})
    // }catch (e) {
    //     return res.send({currentUser: null})
    // }
})

export {router as currentUserRouter}