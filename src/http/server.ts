import fastify from 'fastify'

import { createPoll } from './routes/create-poll';

const server = fastify();

server.register(createPoll)

server.listen({ port: 3333 }).then(() => {
    console.log('server running!');
})