import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import { RoundToSignificantDigitsQuerystring, RoundToSignificantDigitsQuerystringSchema, RoundToSignificantDigitsResponseSchema } from '@fina/common'

import { roundToSignificantDigits } from '../../../services/significant-digits'

const schema: FastifySchema = {
  querystring: RoundToSignificantDigitsQuerystringSchema,
  response: {
    200: RoundToSignificantDigitsResponseSchema
  }
}

export default async function (fastify: FastifyInstance, _: FastifyPluginOptions): Promise<void> {
  fastify.get<{ Querystring: RoundToSignificantDigitsQuerystring }>('/', { schema }, async (request) => {
    const input: number = request.query.input
    const sd: number = request.query.sd

    const answer = roundToSignificantDigits(input, sd)

    return answer
  })
}
