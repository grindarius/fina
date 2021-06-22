import * as helper from '../helpers'
import { Answer } from '../../types'

export function iteration (expression: string, a: number, b: number, iteration: number, decimalPoint: number): Array<Answer> {
  let previousC = 0
  const answerArray: Array<Answer> = []

  for (let i = 0; i < iteration; i++) {
    // * find f(a), f(b)
    const fa = helper.round(helper.evaluateFunction(expression, a), decimalPoint)
    const fb = helper.round(helper.evaluateFunction(expression, b), decimalPoint)

    // * find c
    const cExpression = ((a * fb) - (b * fa)) / (fb - fa)
    const c = helper.round(cExpression, decimalPoint)

    // * find f(c)
    const fc = helper.round(helper.evaluateFunction(expression, c), decimalPoint)

    // * find error
    const error = helper.round(helper.absoluteError(c, previousC), decimalPoint)

    const answer: Answer = { i, a, b, fa, fb, c, fc, error }
    answerArray.push(answer)

    // * a becomes b, b becomes c
    a = b
    b = c
    previousC = c
  }

  return answerArray
}
