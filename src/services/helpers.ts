import * as math from 'mathjs'
import { Page, PageComponent } from '@/types'

/**
 * A function to evaluate the value of `x` in a function
 *
 * @param expression an expression to be calculated
 * @param x an x value to put in
 * @returns a calculated value
 */
export function evaluateFunction (expression: string, x: number): number {
  return math.evaluate(expression, { x: x })
}

/**
 * A function to calculate an absolute error (an error relative to your approximated or desired value)
 *
 * @param current current value
 * @param approximated your desired or approximated value
 * @returns absolute error in percent form.
 */
export function absoluteError (current: number, approximated: number): number {
  return Math.abs(current - approximated) * 100
}

/**
 * A function to calculate a relative error (an error relative to last approximated value)
 *
 * @param current current value that you can calculate
 * @param previous last value
 * @returns relative error in percent form.
 */
export function relativeError (current: number, previous: number): number {
  return Math.abs((current - previous) / current) * 100
}

/**
 * A function to round the selected number
 *
 * @param numberToRound a number that you want to round
 * @param decimalPoint a desired decimal points, 0 if you don't want any rounding
 * @returns a rounded number to your desired decimal points
 */
export function round (numberToRound: number, decimalPoint: number): number {
  if (decimalPoint <= 0) return numberToRound
  else return Math.round(numberToRound * Math.pow(10, decimalPoint)) / Math.pow(10, decimalPoint)
}

/**
 * A function to get first depth of the Page Array.
 *
 * @param pageArray an array of page
 * @returns an array of page component, which is the first depth of the Page array.
 */
export function getFirstLevelPage (pageArray: Array<Page>): Array<PageComponent> {
  return pageArray.map(page => { return { name: page.name, path: page.path } })
}