import { Static, Type } from '@sinclair/typebox'

export interface BaseAnswerObject {
  i: number
  a: number
  b: number
  c: number
  fa: number
  fpa: number
  fb: number
  fc: number
  error: number
}

// * Significant Digits

export const SignificantDigitsQuerystringSchema = Type.Object({
  input: Type.String()
})
export type SignificantDigitsQuerystring = Static<typeof SignificantDigitsQuerystringSchema>

export const SignificantDigitsResponseSchema = Type.String()
export type SignificantDigitsResponse = Static<typeof SignificantDigitsResponseSchema>

// * Bisection

export const BisectionQuerystringSchema = Type.Object({
  expression: Type.String(),
  start: Type.Number(),
  end: Type.Number(),
  iteration: Type.Optional(Type.Number()),
  dp: Type.Optional(Type.Number())
})
export type BisectionQuerystring = Static<typeof BisectionQuerystringSchema>

export const BisectionResponseSchema = Type.Array(Type.Object({
  i: Type.Number(),
  a: Type.Number(),
  b: Type.Number(),
  fa: Type.Number(),
  fb: Type.Number(),
  c: Type.Number(),
  fc: Type.Number(),
  error: Type.Number()
}))
export type BisectionResponse = Static<typeof BisectionResponseSchema>

/**
 * A raw answer object interface to store all the data that each iteration gives in, raw.
 * We need to have this because the system dumps all the information in, then later gets
 * mapped with the `TableDisplay` object to create a 2d array for rendering out as a table.
 */
export type Answer = Partial<BaseAnswerObject>

export const lmao = 69420
