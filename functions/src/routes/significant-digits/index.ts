import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import { SignificantDigitsQuerystring, SignificantDigitsQuerystringSchema, SignificantDigitsResponseSchema } from '@fina/common'

import { findSignificantDigits } from '../../services/significant-digits'

const schema: FastifySchema = {
  querystring: SignificantDigitsQuerystringSchema,
  response: {
    200: SignificantDigitsResponseSchema
  }
}

export default async function (fastify: FastifyInstance, _: FastifyPluginOptions): Promise<void> {
  fastify.get<{ Querystring: SignificantDigitsQuerystring }>('/', { schema }, async (request) => {
    const input: string = request.query.input

    const answer = findSignificantDigits(input)

    return answer
  })
}
