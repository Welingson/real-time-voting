import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const server = fastify();
const prisma = new PrismaClient();


server.post('/polls', async (request, reply) => {

    const createPollBody = z.object({
        title: z.string()
    })

    const { title } = createPollBody.parse(request.body);

    const poll = await prisma.poll.create({
        data: {
            title: title,
        }
    })

    reply.status(201).send(poll);

})

server.listen({ port: 3333 }).then(() => {
    console.log('server running!');
})