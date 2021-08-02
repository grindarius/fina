import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import { deriveFunction, NewtonQuerystring, NewtonQuerystringSchema, NewtonResponseSchema } from '@fina/common'

import { newtonIteration } from '../../services'

const schema: FastifySchema = {
  querystring: NewtonQuerystringSchema,
  response: {
    200: NewtonResponseSchema
  }
}

export default async function (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> {
  instance.get<{ Querystring: NewtonQuerystring }>('/', {
    schema,
    preValidation: [
      async (request, reply, done) => {
        if (request.query.diffedExpression === '' || request.query.diffedExpression == null) {
          try {
            deriveFunction(request.query.expression, request.query.respect)
          } catch (error) {
            await reply.code(500).send(error)
          }
        } else {
          done()
        }
      }
    ]
  }, async (request, _) => {
    const expression = request.query.expression
    const diffedExpression = request.query.diffedExpression === '' || request.query.diffedExpression == null
      ? deriveFunction(request.query.expression, request.query.respect)
      : request.query.diffedExpression

    const respect = request.query.respect
    const a = request.query.start
    const iteration = request.query.iteration ?? 5
    const decimalPoint = request.query.dp ?? 5

    const answer = newtonIteration(expression, diffedExpression, respect, a, iteration, decimalPoint)

    return answer
  })
}
