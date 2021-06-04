import Fastify from 'fastify'
import path from 'path'
import autoload from 'fastify-autoload'
import cors from 'fastify-cors'

const PORT = 3000

const createServer = async (): Promise<void> => {
  const fastify = Fastify()

  await fastify.register(cors)

  await fastify.register(autoload, {
    dir: path.join(__dirname, 'routes')
  })

  await fastify.listen(PORT).then((address) => {
    console.log(`server is running at ${address}`)
  }).catch(e => {
    console.error(e.message as string)
  })
}

createServer().catch(e => { console.error(e.message as string) })
