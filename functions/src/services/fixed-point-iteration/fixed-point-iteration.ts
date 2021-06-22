import * as helper from '../helpers'
import { Answer } from '../../types'

export function iteration (expression: string, fixedExpression: string, a: number, iteration: number, decimalPoint: number): Array<Answer> {
  let previousC = 0
  const answerArray: Array<Answer> = []

  for (let i = 0; i < iteration; i++) {
    // * find f(a)
    const fa = helper.round(helper.evaluateFunction(expression, a), decimalPoint)

    // * find c
    const c = helper.round(helper.evaluateFunction(fixedExpression, a), decimalPoint)

    // * finc f(c)
    const fc = helper.round(helper.evaluateFunction(expression, c), decimalPoint)

    // * find error
    const error = helper.round(helper.absoluteError(c, previousC), decimalPoint)

    const answer: Answer = { i, a, fa, c, fc, error }
    answerArray.push(answer)

    // * next iteration, c becomes a
    a = c
    previousC = c
  }

  return answerArray
}
