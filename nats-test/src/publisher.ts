import nats from 'node-nats-streaming'

const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
}) // stan = client

stan.on('connect', () => {
    console.log('Publisher connected to NATS')
})