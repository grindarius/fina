import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'
import { SignificantDifferenceSchema, SignificantDifferenceQuerystring } from '../../types'
import * as significantDifference from '../../services/significant-difference'

const schema: FastifySchema = {
  querystring: SignificantDifferenceSchema
}

export default async function (fastify: FastifyInstance, _: FastifyPluginOptions): Promise<void> {
  fastify.get<{ Querystring: SignificantDifferenceQuerystring }>('/', { schema }, async (request) => {
    const input = request.query.input

    const answer = significantDifference.calculate(input)

    return answer
  })
}
