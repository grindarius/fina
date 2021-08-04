import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import { compileFunction, deriveFunction, evaluateFunction, FixedPointIterationQuerystring, FixedPointIterationQuerystringSchema, FixedPointIterationResponseSchema } from '@fina/common'

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
    preValidation: [
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
        try {
          evaluateFunction(request.query.fixedExpression, { x: Number(request.query.start) })
          const mathCode = compileFunction(request.query.fixedExpression)
          mathCode.evaluate({ x: Number(request.query.start) })
        } catch (error) {
          await reply.code(400).send({
            statusCode: 400,
            error: 'Bad request',
            message: `the given fixed fixedExpression: ${request.query.fixedExpression} cannot be evaluated.`
          })
        }

        done()
      },
      async (request, reply, done) => {
        if (request.query.checkConvergence === 'true') {
          if (request.query.respect === '' || request.query.respect == null) {
            await reply.code(400).send({
              statusCode: 400,
              error: 'Bad request',
              message: 'Missing \'respect\' when \'checkConvergence\' is \'true\''
            })
          }

          const gpx: number = deriveFunction(request.query.fixedExpression, request.query.respect ?? 'x').evaluate({ [request.query.respect ?? 'x']: Number(request.query.start) })

          if (Math.abs(gpx) > 1) {
            await reply.code(400).send({
              statusCode: 400,
              error: 'Bad request',
              message: `fixed expression does not converge since |g'(x)| = ${gpx}`
            })
          } else {
            done()
          }
        } else {
          done()
        }
      }
    ]
  }, async (request) => {
    const expression = request.query.expression
    const fixedExpression = request.query.fixedExpression
    const a = request.query.start
    const iteration = request.query.iteration ?? 5
    const dp = request.query.dp ?? 5

    const answer = fixedPointIterationIteration(expression, fixedExpression, a, iteration, dp)

    return answer
  })
}
