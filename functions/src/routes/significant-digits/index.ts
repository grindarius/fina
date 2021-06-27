import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import * as significantDifference from '../../services/significant-digits'
import { SignificantDigitsQuerystring, SignificantDigitsSchema } from '../../types'

const schema: FastifySchema = {
  querystring: SignificantDigitsSchema
}

export default async function (fastify: FastifyInstance, _: FastifyPluginOptions): Promise<void> {
  fastify.get<{ Querystring: SignificantDigitsQuerystring }>('/', { schema }, async (request) => {
    const input: Array<string> = request.query.input

    const answer = significantDifference.calculate(input)

    return answer
  })
}
