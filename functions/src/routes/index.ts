import { FastifyInstance, FastifyReply, FastifyPluginOptions } from 'fastify'
import bisectionRoute from './bisection'

export default async function (fastify: FastifyInstance, options: FastifyPluginOptions, done: (err?: Error | undefined) => void): Promise<void> {
  fastify.get('/', options, async (_, rep: FastifyReply) => {
    return await rep.send('lmao from routes')
  })

  await fastify.register(bisectionRoute, { prefix: '/bisection' })

  done()
}
