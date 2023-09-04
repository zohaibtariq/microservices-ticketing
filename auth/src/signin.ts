import express from 'express'

const router = express.Router()

router.post('/api/users/signin', (req, res) => {
    res.send('Hi there! /api/users/signin')
})

export {router as signinRouter}