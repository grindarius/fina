export function calculate (input: string): string {
  const leadingZerosRegExp: RegExp = /^0+\.?0*/g
  const trailingZerosRegExp: RegExp = /0+$/g

  if (input.includes('.')) {
    if (parseFloat(input) > 0) {
      const removedLeadingZeros: string = input.replace(leadingZerosRegExp, '')
      return removedLeadingZeros
    } else if (parseFloat(input) === 0) {
      return '0'
    } else {
      return input
    }
  } else {
    const removedTrailingZeros: string = input.replace(trailingZerosRegExp, '')
    return removedTrailingZeros
  }
}
