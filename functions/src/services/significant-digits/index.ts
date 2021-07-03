export function findSignificantDigits (input: string): string {
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

export function roundToSignificantDigits (input: number, sfCount: number): string {
  let matches = input.toString().match(/^-?(0+)\.(0*)/)

  if (matches != null) {
    const firstIndex = matches[0].length
    const prefix = matches[0]

    const sf = Number(input.toString().substring(firstIndex, firstIndex + sfCount + 1))
    const roundedSF = Math.round(sf / 10)
    const sfString = prefix + roundedSF.toString()
    return Number(sfString).toFixed(matches[2].length + sfCount)
  } else {
    matches = input.toString().match(/^(-?(\d+))\.(\d+)/)

    const secondIndexMatch = matches != null ? matches[2].length : 0
    const decimalShift = sfCount - secondIndexMatch
    const rounded = Math.round(input * Math.pow(10, decimalShift))
    const shifted = rounded / Math.pow(10, decimalShift)

    return shifted.toFixed(decimalShift)
  }
}
