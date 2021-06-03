import { FastifyInstance, FastifyReply, FastifyPluginOptions } from 'fastify'

export default async function (fastify: FastifyInstance, options: FastifyPluginOptions, done: (err?: Error | undefined) => void): Promise<void> {
  fastify.get('/', options, async (_, rep: FastifyReply) => {
    return await rep.send('lmao from sig')
  })

  done()
}
