import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import * as significantDifference from '../../services/significant-digits'
import { SignificantDigitsQuerystring, SignificantDigitsQuerystringSchema, SignificantDigitsResponseSchema } from '../../types'

const schema: FastifySchema = {
  querystring: SignificantDigitsQuerystringSchema,
  response: {
    200: SignificantDigitsResponseSchema
  }
}

export default async function (fastify: FastifyInstance, _: FastifyPluginOptions): Promise<void> {
  fastify.get<{ Querystring: SignificantDigitsQuerystring }>('/', { schema }, async (request) => {
    const input: string = request.query.input

    const answer = significantDifference.calculate(input)

    return answer
  })
}
