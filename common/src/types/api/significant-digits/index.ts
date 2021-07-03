import { Static, Type } from '@sinclair/typebox'

export const SignificantDigitsQuerystringSchema = Type.Object({
  input: Type.String()
})
export type SignificantDigitsQuerystring = Static<typeof SignificantDigitsQuerystringSchema>

export const SignificantDigitsResponseSchema = Type.String()
export type SignificantDigitsResponse = Static<typeof SignificantDigitsResponseSchema>
