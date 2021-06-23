import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'
import { SignificantDigitsSchema, SignificantDigitsQuerystring } from '../../types'
import * as significantDifference from '../../services/significant-digits'

const schema: FastifySchema = {
  querystring: SignificantDigitsSchema
}

export default async function (fastify: FastifyInstance, _: FastifyPluginOptions): Promise<void> {
  fastify.get<{ Querystring: SignificantDigitsQuerystring }>('/', { schema }, async (request) => {
    const input = request.query.input

    const answer = significantDifference.calculate(input)

    return answer
  })
}
