export function calculate (input: string): string {
  const leadingZerosRegExp: RegExp = /^\.?0*/
  const trailingZerosRegExp: RegExp = /0+$/

  if (input.includes('.')) {
    if (parseFloat(input) > 0) {
      const removedLeadingZeros: string = input.replaceAll(leadingZerosRegExp, '')
      return removedLeadingZeros
    } else {
      return input
    }
  } else {
    const removedTrailingZeros: string = input.replaceAll(trailingZerosRegExp, '')
    return removedTrailingZeros
  }
}
