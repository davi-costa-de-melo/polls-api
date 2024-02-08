import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '@/lib'

export async function createPoll(app: FastifyInstance) {
  app.post('/polls', async (request, reply) => {
    const createPollBody = z.object({
      title: z.string(),
      options: z.array(z.string()),
    })

    const { title, options } = createPollBody.parse(request.body)

    const { id } = await prisma.poll.create({
      data: {
        title,
        options: {
          create: options.map((option) => ({ title: option })),
        },
      },
    })

    return reply.status(201).send({ id })
  })
}
