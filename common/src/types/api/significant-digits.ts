import { Static, Type } from '@sinclair/typebox'

export const SignificantDigitsQuerystringSchema = Type.Object({
  input: Type.String()
})
export type SignificantDigitsQuerystring = Static<typeof SignificantDigitsQuerystringSchema>

export const SignificantDigitsResponseSchema = Type.Object({
  output: Type.String(),
  amount: Type.Number()
})
export type SignificantDigitsResponse = Static<typeof SignificantDigitsResponseSchema>
