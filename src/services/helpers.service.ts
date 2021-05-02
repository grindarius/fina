/**
 * Helper function to help round the number to your desired decimal points.
 * @param numberToRound number that you want to be rounding.
 * @param dp the amount of decimal points you want to round between 1 and 10.
 * @returns rounded number to your desired decimal point.
 */
export function round (numberToRound: number, dp: number): number {
  if (dp <= 0) return numberToRound
  if (dp > 10) throw new Error('Error: Maximum decimal points function could take. between 0 to 10 only.')
  const divider = Math.pow(10, dp)

  return Math.round(numberToRound * divider) / divider
}
