import * as math from 'mathjs'

import { absoluteError, evaluateFunction, NewtonResponse, NewtonResponseObject, round } from '@fina/common'

export function newtonIteration (expression: string, diffedExpression: string, a: number, iteration: number, decimalPoint: number): NewtonResponse {
  let previousC = 0
  const answerArray: NewtonResponse = []

  for (let i = 0; i < iteration; i++) {
    // * find f(a)
    const fa = round(evaluateFunction(expression, { x: a }), decimalPoint)

    // * find f'(a),
    // * if no expression is passed in: we differentiate the function ourself and evaluate automatically.
    // * if function is passed in, we use that function.

    // TODO Art: Allow user to change respect of the function
    const fpa = diffedExpression === 'unknown'
      ? round(math.derivative(expression, 'x').evaluate({ x: a }), decimalPoint)
      : round(evaluateFunction(diffedExpression, { x: a }), decimalPoint)

    // * find c
    const c = round(a - (fa / fpa), decimalPoint)

    // * finc f(c)
    const fc = round(evaluateFunction(expression, { x: c }), decimalPoint)

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
