import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import { deriveFunction, FixedPointIterationQuerystring, FixedPointIterationQuerystringSchema, FixedPointIterationResponseSchema, round } from '@fina/common'

import { fixedPointIterationIteration } from '../../services'

const schema: FastifySchema = {
  querystring: FixedPointIterationQuerystringSchema,
  response: {
    200: FixedPointIterationResponseSchema
  }
}

export default async function (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> {
  instance.get<{ Querystring: FixedPointIterationQuerystring }>('/', {
    schema,
    preValidation: async (request, reply, done) => {
      if (request.query.checkConvergence) {
        const gpa = round(deriveFunction(request.query.fixedExpression, 'x').evaluate({ x: request.query.start }), request.query.dp ?? 5)

        if (Math.abs(gpa) > 1) {
          await reply.code(400).send({
            statusCode: 400,
            error: 'Bad request',
            message: `fixed expression does not converge since |g'(x)| = ${gpa}`
          })
        } else {
          done()
        }
      } else {
        done()
      }
    }
  }, async (request, _) => {
    const expression = request.query.expression
    const fixedExpression = request.query.fixedExpression
    const a = request.query.start
    const iteration = request.query.iteration ?? 5
    const dp = request.query.dp ?? 5

    const answer = fixedPointIterationIteration(expression, fixedExpression, a, iteration, dp)

    return answer
  })
}
