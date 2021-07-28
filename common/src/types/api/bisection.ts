import { Static, Type } from '@sinclair/typebox'

export const BisectionQuerystringSchema = Type.Object({
  expression: Type.String(),
  start: Type.Number(),
  end: Type.Number(),
  iteration: Type.Optional(Type.Number()),
  dp: Type.Optional(Type.Number())
})
export type BisectionQuerystring = Static<typeof BisectionQuerystringSchema>

export const BisectionResponseObjectSchema = Type.Object({
  i: Type.Number(),
  a: Type.Number(),
  b: Type.Number(),
  fa: Type.Number(),
  fb: Type.Number(),
  c: Type.Number(),
  fc: Type.Number(),
  error: Type.Number()
})
export type BisectionResponseObject = Static<typeof BisectionResponseObjectSchema>

export const BisectionResponseSchema = Type.Array(BisectionResponseObjectSchema)
export type BisectionResponse = Static<typeof BisectionResponseSchema>
