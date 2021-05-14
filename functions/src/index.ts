import fastify, { FastifyRequest, FastifyReply } from 'fastify'

const app = fastify({
  logger: true
})
const PORT = 3002

app.get('/', (_: FastifyRequest, reply: FastifyReply) => {
  reply.send({ hello: 'world' })
})

app.listen(PORT, (error: Error, address: string) => {
  if (error) {
    app.log.error(error)
    process.exit(1)
  }
  app.log.info(`We're listenting to changes at http://localhost:${address}`)
})
