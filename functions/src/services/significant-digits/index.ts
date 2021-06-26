export function calculate (input: Array<string>): Array<string> {
  const leadingZerosRegExp: RegExp = /^0+\.?0*/g
  const trailingZerosRegExp: RegExp = /0+$/g

  const answers = input.map(item => {
    if (item.includes('.')) {
      if (parseFloat(item) > 0) {
        const removedLeadingZeros: string = item.replace(leadingZerosRegExp, '')
        return removedLeadingZeros
      } else if (parseFloat(item) === 0) {
        return '0'
      } else {
        return item
      }
    } else {
      const removedTrailingZeros: string = item.replace(trailingZerosRegExp, '')
      return removedTrailingZeros
    }
  })

  return answers
}
