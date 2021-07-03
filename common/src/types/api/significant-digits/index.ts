import { Static, Type } from '@sinclair/typebox'

export const SignificantDigitsAmountQuerystringSchema = Type.Object({
  input: Type.String()
})
export type SignificantDigitsAmountQuerystring = Static<typeof SignificantDigitsAmountQuerystringSchema>

export const SignificantDigitsAmountResponseSchema = Type.String()
export type SignificantDigitsAmountResponse = Static<typeof SignificantDigitsAmountResponseSchema>

export const RoundToSignificantDigitsQuerystringSchema = Type.Object({
  input: Type.Number(),
  sd: Type.Number({ minimum: 1 })
})
export type RoundToSignificantDigitsQuerystring = Static<typeof RoundToSignificantDigitsQuerystringSchema>

export const RoundToSignificantDigitsResponseSchema = Type.String()
export type RoundToSignificantDigitsResponse = Static<typeof RoundToSignificantDigitsResponseSchema>
