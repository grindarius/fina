export function calculate (input: string): string {
  const leadingZerosRegExp: RegExp = /^\.?0*/g
  const trailingZerosRegExp: RegExp = /0+$/g

  if (input.includes('.')) {
    if (parseFloat(input) > 0) {
      const removedLeadingZeros: string = input.replace(leadingZerosRegExp, '')
      return removedLeadingZeros
    } else {
      return input
    }
  } else {
    const removedTrailingZeros: string = input.replace(trailingZerosRegExp, '')
    return removedTrailingZeros
  }
}
