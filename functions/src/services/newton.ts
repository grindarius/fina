import * as math from 'mathjs'

import { absoluteError, compileFunction, evaluateFunction, NewtonResponse, NewtonResponseObject, round } from '@fina/common'

export function newtonIteration (expression: string, diffedExpression: math.MathNode | string, respect: string, a: number, iteration: number, decimalPoint: number): NewtonResponse {
  let previousC = 0
  const answerArray: NewtonResponse = []
  const mathCode = compileFunction(expression)

  for (let i = 1; i <= iteration; i++) {
    // * find f(a)
    const fa = round(mathCode.evaluate({ [respect]: a }), decimalPoint)

    let fpa: number = 0
    if (typeof diffedExpression === 'string') {
      fpa = round(evaluateFunction(diffedExpression, { [respect]: a }), decimalPoint)
    } else {
      fpa = round(diffedExpression.evaluate({ [respect]: a }), decimalPoint)
    }

    // * find c
    const c = round(a - (fa / fpa), decimalPoint)

    // * finc f(c)
    const fc = round(evaluateFunction(expression, { [respect]: c }), decimalPoint)

    // * find error
    const error = round(absoluteError(c, previousC), decimalPoint)

    const answer: NewtonResponseObject = { i, a, fa, fpa, c, fc, error }

    answerArray.push(answer)

    // * next iteration, c becomes a
    a = c
    previousC = c
  }

  return answerArray
}
