import fastify from 'fastify'
import cookie from '@fastify/cookie'
import fastifyWebsocket from '@fastify/websocket';


import { createPoll } from './routes/create-poll';
import { getPoll } from './routes/get-poll';
import { voteOnPoll } from './routes/vote-on-poll';
import { pollResults } from './ws/poll-results';

const server = fastify();

server.register(cookie, {
    secret: "real-time-voting",
    hook: 'onRequest'
});

server.register(fastifyWebsocket)

server.register(createPoll)
server.register(getPoll)
server.register(voteOnPoll)
server.register(pollResults)

server.listen({ port: 3333 }).then(() => {
    console.log('server running!');
})