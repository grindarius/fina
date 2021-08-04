import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import { compileFunction, evaluateFunction, FalsePositionQuerystring, FalsePositionQuerystringSchema, FalsePositionResponse, FalsePositionResponseSchema, round } from '@fina/common'

import { falsePositionIteration } from '../../services'

const schema: FastifySchema = {
  querystring: FalsePositionQuerystringSchema,
  response: {
    200: FalsePositionResponseSchema
  }
}

export default async function (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> {
  instance.get<{ Querystring: FalsePositionQuerystring }>('/', {
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
      async (request, reply, done) => {
        const fa = round(evaluateFunction(request.query.expression, { x: Number(request.query.start) }), Number(request.query.dp) ?? 5)
        const fb = round(evaluateFunction(request.query.expression, { x: Number(request.query.end) }), Number(request.query.dp) ?? 5)

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
  }, async (request, _) => {
    const expression = request.query.expression
    const a = request.query.start
    const b = request.query.end
    const iteration = request.query.iteration ?? 5
    const dp = request.query.dp ?? 5

    const answer: FalsePositionResponse = falsePositionIteration(expression, a, b, iteration, dp)

    return answer
  })
}
