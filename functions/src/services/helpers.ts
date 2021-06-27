import * as math from 'mathjs'

/**
 * A function to evaluate the value of `x` in a function
 *
 * @param expression an expression to be calculated
 * @param x an x value to put in
 * @return a calculated value
 */
export function evaluateFunction (expression: string, x: number): number {
  return math.evaluate(expression, { x: x })
}

/**
 * A function to calculate a relative error (an error relative to your approximated or desired value)
 *
 * @param current current value
 * @param approximated your desired or approximated value
 * @return absolute error in percent form.
 */
export function relativeError (current: number, approximated: number): number {
  return Math.abs(current - approximated) * 100
}

/**
 * A function to calculate an absolute error (an error relative to last approximated value)
 *
 * @param current current value that you can calculate
 * @param previous last value
 * @return relative error in percent form.
 */
export function absoluteError (current: number, previous: number): number {
  return Math.abs((current - previous) / current) * 100
}

/**
 * A function to round the selected number
 *
 * @param numberToRound a number that you want to round
 * @param decimalPoint a desired decimal points, 0 if you don't want any rounding
 * @return a rounded number to your desired decimal points
 */
export function round (numberToRound: number, decimalPoint: number): number {
  if (decimalPoint <= 0) return numberToRound
  else return Math.round(numberToRound * Math.pow(10, decimalPoint)) / Math.pow(10, decimalPoint)
}
