import { Static, Type } from '@sinclair/typebox'

interface BaseAnswerObject {
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

export const SignificantDifferenceSchema = Type.Object({
  input: Type.String()
})
export type SignificantDifferenceQuerystring = Static<typeof SignificantDifferenceSchema>

export const BaseQuerystringSchema = Type.Object({
  expression: Type.String(),
  start: Type.Number(),
  end: Type.Number(),
  iteration: Type.Optional(Type.Number()),
  decimalPoint: Type.Optional(Type.Number())
})
export type BisectionQuerystring = Static<typeof BaseQuerystringSchema>

/**
 * A raw answer object interface to store all the data that each iteration gives in, raw.
 * We need to have this because the system dumps all the information in, then later gets
 * mapped with the `TableDisplay` object to create a 2d array for rendering out as a table.
 */
export type Answer = Partial<BaseAnswerObject>
