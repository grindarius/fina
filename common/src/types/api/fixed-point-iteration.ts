import { Static, Type } from '@sinclair/typebox'

export const FixedPointIterationQuerystringSchema = Type.Object({
  expression: Type.String(),
  fixedExpression: Type.String(),
  start: Type.Number(),
  checkConvergence: Type.String(),
  respect: Type.Optional(Type.String()),
  iteration: Type.Optional(Type.Number({
    minimum: 1,
    maximum: 100
  })),
  dp: Type.Optional(Type.Number({
    minimum: 1,
    maximum: 15
  }))
})
export type FixedPointIterationQuerystring = Static<typeof FixedPointIterationQuerystringSchema>

export const FixedPointIterationResponseObjectSchema = Type.Object({
  i: Type.Number(),
  a: Type.Number(),
  fa: Type.Number(),
  c: Type.Number(),
  fc: Type.Number(),
  error: Type.Number()
})
export type FixedPointIterationResponseObject = Static<typeof FixedPointIterationResponseObjectSchema>

export const FixedPointIterationResponseSchema = Type.Array(FixedPointIterationResponseObjectSchema)
export type FixedPointIterationResponse = Static<typeof FixedPointIterationResponseSchema>
