import { FastifyInstance, FastifySchema, FastifyPluginOptions } from 'fastify'
import { Answer, BisectionQuerystring, BisectionSchema } from '../../types'
import * as bisection from '../../services/bisection'

const schema: FastifySchema = {
  querystring: BisectionSchema
}

export default async function (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> {
  instance.get<{ Querystring: BisectionQuerystring }>('/', { schema }, async (request, _) => {
    const expression = request.query.expression
    const a = request.query.start
    const b = request.query.end
    const iteration = request.query.iteration ?? 5
    const decimalPoint = request.query.decimalPoint ?? 5

    const answer: Array<Answer> = bisection.iteration(expression, a, b, iteration, decimalPoint)

    return answer
  })
}