import fastify from 'fastify'
import cookie from '@fastify/cookie'
import websocket from '@fastify/websocket'
import { ZodError } from 'zod'
import { createPoll, getPoll, voteOnPoll } from './http/routes'
import { pollResults } from './http/ws'

const app = fastify()

app.register(cookie, {
  secret: process.env.COOKIE_SECRET,
  hook: 'onRequest',
})
app.register(websocket)
app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)
app.register(pollResults)

app
  .listen({
    port: Number(process.env.PORT) ?? 3000,
  })
  .then((address) => {
    console.log(`HTTP server started at ${address}`)
  })

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }

  return reply.status(500).send({
    message: 'Internal server error',
  })
})
