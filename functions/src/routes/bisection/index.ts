import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import { BisectionQuerystring, BisectionQuerystringSchema, BisectionResponse, BisectionResponseSchema, compileFunction, evaluateFunction, round } from '@fina/common'

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
        if (Number(request.query.start) > Number(request.query.end)) {
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
        try {
          evaluateFunction(request.query.expression, { x: Number(request.query.start) })
          const mathCode = compileFunction(request.query.expression)
          mathCode.evaluate({ x: Number(request.query.start) })
        } catch (error) {
          await reply.code(400).send({
            statusCode: 400,
            error: 'Bad request',
            message: `the given expression: ${request.query.expression} cannot be evaluated.`
          })
        }

        done()
      },
      async (request, reply, done): Promise<void> => {
        const mathCode = compileFunction(request.query.expression)

        const fa = round(mathCode.evaluate({ x: Number(request.query.start) }), Number(request.query.dp) ?? 5)
        const fb = round(mathCode.evaluate({ x: Number(request.query.end) }), Number(request.query.dp) ?? 5)

        if (fa * fb >= 0) {
          await reply.code(400).send({
            statusCode: 400,
            error: 'Bad request',
            message: `f(a) and f(b) does not have opposing signs, f(a) = ${fa}, f(b) = ${fb}`
          })
        } else {
          done()
        }
      }
    ]
  }, async (request) => {
    const expression = request.query.expression
    const a = request.query.start
    const b = request.query.end
    const iteration = request.query.iteration ?? 5
    const dp = request.query.dp ?? 5

    const answer: BisectionResponse = bisectionIteration(expression, a, b, iteration, dp)

    return answer
  })
}
