import { Answer } from '../../types'
import * as helper from '../helpers'

export function iteration (expression: string, a: number, b: number, iteration: number, decimalPoint: number): Array<Answer> {
  let previousC = 0
  const answerArray: Array<Answer> = []
  console.log(expression)

  for (let i = 0; i < iteration; i++) {
    // * find f(a), f(b)
    const fa = helper.round(helper.evaluateFunction(expression, a), decimalPoint)
    const fb = helper.round(helper.evaluateFunction(expression, b), decimalPoint)

    // * find c
    const cExpression = (a + b) / 2
    const c = helper.round(cExpression, decimalPoint)

    // * find f(c)
    const fc = helper.round(helper.evaluateFunction(expression, c), decimalPoint)

    // * find error
    const error = helper.round(helper.absoluteError(c, previousC), decimalPoint)

    const answer: Answer = { i, a, b, fa, fb, c, fc, error }
    answerArray.push(answer)

    // * compare f(a) * f(c)
    if (fa * fc < 0) {
      b = c
    } else if (fa * fc > 0) {
      a = c
    }

    previousC = c
  }

  return answerArray
}
