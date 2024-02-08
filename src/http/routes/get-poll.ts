import { FastifyInstance } from 'fastify'
import z from 'zod'
import { prisma, redis } from '@/lib'
import { formatVotesResult } from '@/utils'

export async function getPoll(app: FastifyInstance) {
  app.get('/polls/:id', async (request, reply) => {
    const getPollParams = z.object({
      id: z.string().uuid(),
    })

    const { id } = getPollParams.parse(request.params)

    const poll = await prisma.poll.findUnique({
      where: { id },
      include: {
        options: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })

    if (!poll) {
      return reply.status(404).send({
        message: 'Poll not found',
      })
    }

    const result = await redis.zrange(id, 0, -1, 'WITHSCORES')
    const votes = formatVotesResult(result)

    return {
      id: poll.id,
      title: poll.title,
      options: poll.options.map((option) => ({
        id: option.id,
        title: option.title,
        votes: option.id in votes ? votes[option.id] : 0,
      })),
    }
  })
}
