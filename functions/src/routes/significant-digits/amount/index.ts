import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import { SignificantDigitsAmountQuerystring, SignificantDigitsAmountQuerystringSchema, SignificantDigitsAmountResponseSchema } from '@fina/common'

import { findSignificantDigits } from '../../../services/significant-digits'

const schema: FastifySchema = {
  querystring: SignificantDigitsAmountQuerystringSchema,
  response: {
    200: SignificantDigitsAmountResponseSchema
  }
}

export default async function (fastify: FastifyInstance, _: FastifyPluginOptions): Promise<void> {
  fastify.get<{ Querystring: SignificantDigitsAmountQuerystring }>('/', { schema }, async (request) => {
    const input: string = request.query.input

    const answer = findSignificantDigits(input)

    return answer
  })
}
