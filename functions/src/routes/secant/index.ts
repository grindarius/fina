import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import { compileFunction, evaluateFunction, SecantQuerystring, SecantQuerystringSchema, SecantResponseSchema } from '@fina/common'

import { secantIteration } from '../../services'

const schema: FastifySchema = {
  querystring: SecantQuerystringSchema,
  response: {
    200: SecantResponseSchema
  }
}

export default async function (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> {
  instance.get<{ Querystring: SecantQuerystring }>('/', {
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

        const fa: number = mathCode.evaluate({ x: Number(request.query.start) })
        const fb: number = mathCode.evaluate({ x: Number(request.query.end) })

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

    const answer = secantIteration(expression, a, b, iteration, dp)

    return answer
  })
}
