import { Static, Type } from '@sinclair/typebox'

export const SignificantDigitsAmountQuerystringSchema = Type.Object({
  input: Type.String()
})
export type SignificantDigitsAmountQuerystring = Static<typeof SignificantDigitsAmountQuerystringSchema>

export const SignificantDigitsAmountResponseSchema = Type.String()
export type SignificantDigitsAmountResponse = Static<typeof SignificantDigitsAmountResponseSchema>
