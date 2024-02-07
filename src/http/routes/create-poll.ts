import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function createPoll(server: FastifyInstance) {
    server.post('/polls', async (request, reply) => {

        const createPollBody = z.object({
            title: z.string(),
            options: z.array(z.string())
        })

        const { title, options } = createPollBody.parse(request.body);

        const poll = await prisma.poll.create({
            data: {
                title,
                PollOption: {
                    createMany: {
                        data: options.map(option => {
                            return { title: option }
                        })
                    }
                }
            }
        })

        reply.status(201).send(poll);
    })

}