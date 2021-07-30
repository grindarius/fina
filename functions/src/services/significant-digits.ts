import { dotRegExp, SignificantDigitsResponse } from '@fina/common'

export function findSignificantDigits (input: string): SignificantDigitsResponse {
  const leadingZerosRegExp: RegExp = /^0+\.?0*/g
  const trailingZerosRegExp: RegExp = /0+$/g

  if (input.includes('.')) {
    if (parseFloat(input) > 0) {
      const removedLeadingZeros: string = input.replace(leadingZerosRegExp, '')
      return {
        output: removedLeadingZeros,
        amount: removedLeadingZeros.replace(dotRegExp, '').length
      }
    } else if (parseFloat(input) === 0) {
      return {
        output: '0',
        amount: 1
      }
    } else {
      return {
        output: input,
        amount: input.replace(dotRegExp, '').length
      }
    }
  } else if (input === '0') {
    return {
      output: '0',
      amount: 1
    }
  } else {
    const removedTrailingZeros: string = input.replace(trailingZerosRegExp, '')
    return {
      output: removedTrailingZeros,
      amount: removedTrailingZeros.replace(dotRegExp, '').length
    }
  }
}
