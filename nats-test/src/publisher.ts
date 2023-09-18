import nats from 'node-nats-streaming'
import {randomBytes} from "node:crypto"

console.clear()

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
}) // stan = client

stan.on('connect', () => {
    console.log('Publisher connected to NATS')
    const data = JSON.stringify({
        id: 1,
        title: 'connect',
        price: 1
    })
    stan.publish('ticket:created', data, () => {
        console.log('Event published')
    })
})