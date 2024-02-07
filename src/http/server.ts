import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { createPoll } from './routes/create-poll';
import { getPoll } from './routes/get-poll';
import { voteOnPoll } from './routes/vote-on-poll';

const server = fastify();

server.register(cookie, {
    secret: "real-time-voting",
    hook: 'onRequest'
});

server.register(createPoll)
server.register(getPoll)
server.register(voteOnPoll)

server.listen({ port: 3333 }).then(() => {
    console.log('server running!');
})