import Fastify, { FastifyInstance } from 'fastify'
import autoload from 'fastify-autoload'
import cors from 'fastify-cors'
import path from 'path'

const PORT = 3000

const createServer = (): FastifyInstance => {
  const fastify = Fastify()

  void fastify.register(cors)

  void fastify.register(autoload, {
    dir: path.join(__dirname, 'routes')
  })

  return fastify
}

createServer().listen(PORT).then((address) => {
  console.log(`Server is running at ${address}`)
}).catch((e) => {
  console.trace(e)
})
