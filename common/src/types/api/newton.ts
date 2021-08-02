import { Static, Type } from '@sinclair/typebox'

export const NewtonQuerystringSchema = Type.Object({
  expression: Type.String(),
  diffedExpression: Type.Optional(Type.String()),
  start: Type.Number(),
  iteration: Type.Optional(Type.Number({
    minimum: 1,
    maximum: 100
  })),
  dp: Type.Optional(Type.Number({
    minimum: 1,
    maximum: 15
  }))
})
export type NewtonQuerystring = Static<typeof NewtonQuerystringSchema>

export const NewtonResponseObjectSchema = Type.Object({
  i: Type.Number(),
  a: Type.Number(),
  fa: Type.Number(),
  fpa: Type.Number(),
  c: Type.Number(),
  fc: Type.Number(),
  error: Type.Number()
})
export type NewtonResponseObject = Static<typeof NewtonResponseObjectSchema>

export const NewtonResponseSchema = Type.Array(NewtonResponseObjectSchema)
export type NewtonResponse = Static<typeof NewtonResponseSchema>
