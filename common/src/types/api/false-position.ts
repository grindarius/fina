import { Static, Type } from '@sinclair/typebox'

export const FalsePositionQuerystringSchema = Type.Object({
  expression: Type.String(),
  start: Type.Number(),
  end: Type.Number(),
  iteration: Type.Optional(Type.Number({
    minimum: 1,
    maximum: 100
  })),
  dp: Type.Optional(Type.Number({
    minimum: 1,
    maximum: 15
  }))
})
export type FalsePositionQuerystring = Static<typeof FalsePositionQuerystringSchema>

export const FalsePositionResponseObjectSchema = Type.Object({
  i: Type.Number(),
  a: Type.Number(),
  b: Type.Number(),
  fa: Type.Number(),
  fb: Type.Number(),
  c: Type.Number(),
  fc: Type.Number(),
  error: Type.Number()
})
export type FalsePositionResponseObject = Static<typeof FalsePositionResponseObjectSchema>

export const FalsePositionResponseSchema = Type.Array(FalsePositionResponseObjectSchema)
export type FalsePositionResponse = Static<typeof FalsePositionResponseSchema>
