import Fastify from 'fastify'
import route from './routes'

const PORT = 3002

const createServer = async (): Promise<void> => {
  const fastify = Fastify()

  await fastify.register(route, { prefix: '/' })

  await fastify.listen(PORT).then((address) => {
    console.log(`server is running at ${address}`)
  }).catch(e => {
    throw new Error(e.message as string)
  })
}

createServer().then(() => {}).catch(e => { console.error(e.message as string) })
