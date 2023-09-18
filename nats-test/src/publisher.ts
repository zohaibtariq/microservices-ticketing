import nats from 'node-nats-streaming'

console.clear()

const stan = nats.connect('ticketing', 'nats-publisher', {
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