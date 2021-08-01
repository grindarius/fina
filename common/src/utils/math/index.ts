import * as math from 'mathjs'

/**
 * A function to evaluate the value of any variable in a function
 *
 * @param expression an expression to be calculated
 * @param variables a record of variables to put in the function.
 * @return a calculated value
 */
export function evaluateFunction (expression: string, variables: Record<string, number>): number {
  return math.evaluate(expression, variables)
}

/**
 * A function to compile an expression string into JavaScript code for faster
 * calculations over many iterations.
 *
 * @param expression an expression to be calculated
 * @returns a math object with an `evaluate()` function to calculate
 */
export function compileFunction (expression: string): math.EvalFunction {
  return math.compile(expression)
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
  if (decimalPoint <= 0 || decimalPoint > 15) return numberToRound
  else return Math.round(numberToRound * Math.pow(10, decimalPoint)) / Math.pow(10, decimalPoint)
}

/**
 * A function to generates LaTeX code from the expression string.
 * If it's unparsable, will return empty string
 *
 * @param expression an expression string
 * @returns an expression string in LaTeX form
 */
export function expressionToTex (expression: string): string {
  try {
    return math.parse(expression).toTex()
  } catch (error) {
    console.error(error)
    return ''
  }
}

/**
 * A function to run a derivative through the given expression string. Can be chained
 * with `.evaluate({ x })` to evaluate the function.
 * ```ts
 * const fpx = deriveFunction('x^3', 'x')
 * const value = fpx.evaluate({ x: 4 })
 * value // 48
 * ```
 *
 * @param expression an expression string to derive
 * @param respect which variable to derive to
 * @returns a `MathNode` that can be evaluaated later
 */
export function deriveFunction (expression: string, respect: string): math.MathNode {
  return math.derivative(expression, respect)
}

/**
 * A function to generate random number between 2 integers (inclusive).
 * ```ts
 * const random = getRandomIntInclusive(1, 5)
 * random // any number between 1-5
 * ```
 *
 * @param min minimum range.
 * @param max maximum range
 * @returns random integer inside the range.
 */
export function getRandomIntInclusive (min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}
