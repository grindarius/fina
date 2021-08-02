import { Static, Type } from '@sinclair/typebox'

export const SecantQuerystringSchema = Type.Object({
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
export type SecantQuerystring = Static<typeof SecantQuerystringSchema>

export const SecantResponseObjectSchema = Type.Object({
  i: Type.Number(),
  a: Type.Number(),
  b: Type.Number(),
  fa: Type.Number(),
  fb: Type.Number(),
  c: Type.Number(),
  fc: Type.Number(),
  error: Type.Number()
})
export type SecantResponseObject = Static<typeof SecantResponseObjectSchema>

export const SecantResponseSchema = Type.Array(SecantResponseObjectSchema)
export type SecantResponse = Static<typeof SecantResponseSchema>
