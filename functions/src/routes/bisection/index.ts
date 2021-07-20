import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import { Answer, BisectionQuerystring, BisectionQuerystringSchema, BisectionResponseSchema } from '@fina/common'

import { bisectionIteration } from '../../services/bisection'

const schema: FastifySchema = {
  querystring: BisectionQuerystringSchema,
  response: {
    200: BisectionResponseSchema
  }
}

export default async function (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> {
  instance.get<{ Querystring: BisectionQuerystring }>('/', { schema }, async (request, _) => {
    const expression = request.query.expression
    const a = request.query.start
    const b = request.query.end
    const iteration = request.query.iteration ?? 5
    const decimalPoint = request.query.dp ?? 5

    const answer: Array<Answer> = bisectionIteration(expression, a, b, iteration, decimalPoint)

    return answer
  })
}
