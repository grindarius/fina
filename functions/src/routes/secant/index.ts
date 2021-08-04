import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import { SecantQuerystring, SecantQuerystringSchema, SecantResponseSchema } from '@fina/common'

import { secantIteration } from '../../services'

const schema: FastifySchema = {
  querystring: SecantQuerystringSchema,
  response: {
    200: SecantResponseSchema
  }
}

export default async function (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> {
  instance.get<{ Querystring: SecantQuerystring }>('/', {
    schema
  }, async (request, _) => {
    const expression = request.query.expression
    const a = request.query.start
    const b = request.query.end
    const iteration = request.query.iteration ?? 5
    const dp = request.query.dp ?? 5

    const answer = secantIteration(expression, a, b, iteration, dp)

    return answer
  })
}
