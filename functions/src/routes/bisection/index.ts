import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import { Answer, BisectionQuerystring, BisectionQuerystringSchema, BisectionResponseSchema, evaluateFunction, round } from '@fina/common'

import { bisectionIteration } from '../../services/bisection'

const schema: FastifySchema = {
  querystring: BisectionQuerystringSchema,
  response: {
    200: BisectionResponseSchema
  }
}

export default async function (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> {
  instance.get<{ Querystring: BisectionQuerystring }>('/', {
    schema,
    preValidation: [
      async (request, reply, done) => {
        if (request.query.start > request.query.end) {
          await reply.code(400).send({
            statusCode: 400,
            error: 'Bad request',
            message: 'Property \'start\' is greater than \'end\''
          })
        } else {
          done()
        }
      },
      async (request, reply, done) => {
        const fa = round(evaluateFunction(request.query.expression, request.query.start), request.query.dp ?? 5)
        const fb = round(evaluateFunction(request.query.expression, request.query.start), request.query.dp ?? 5)

        if (fa * fb >= 0) {
          await reply.code(400).send({
            statusCode: 400,
            error: 'Bad request',
            message: 'f(a) and f(b) does not have opposing signs'
          })
        } else {
          done()
        }
      }
    ]
  }, async (request, _) => {
    const expression = request.query.expression
    const a = request.query.start
    const b = request.query.end
    const iteration = request.query.iteration ?? 5
    const decimalPoint = request.query.dp ?? 5

    const answer: Array<Answer> = bisectionIteration(expression, a, b, iteration, decimalPoint)

    return answer
  })
}
