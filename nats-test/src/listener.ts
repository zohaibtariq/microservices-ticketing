import nats, {Message} from 'node-nats-streaming'
import {randomBytes} from "node:crypto"

console.clear()

// client id must be unique
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
}) // stan = client

stan.on('connect', () => {
    console.log('Listener connected to NATS')
    const subscription = stan.subscribe('ticket:created')
    subscription.on('message', (msg: Message) => {
        console.log('Message Received')
        const data = msg.getData()
        if(typeof data === 'string'){
            console.log(`Received event #${msg.getSequence()}, with data ${data}`)
        }
    })
})