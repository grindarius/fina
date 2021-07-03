import * as math from 'mathjs'

import { absoluteError, Answer, evaluateFunction, round } from '@fina/common'

export function iteration (expression: string, diffedExpression: string, a: number, iteration: number, decimalPoint: number): Array<Answer> {
  let previousC = 0
  const answerArray: Array<Answer> = []

  for (let i = 0; i < iteration; i++) {
    // * find f(a)
    const fa = round(evaluateFunction(expression, a), decimalPoint)

    // * find f'(a),
    // * if no expression is passed in: we differentiate the function ourself and evaluate automatically.
    // * if function is passed in, we use that function.

    // TODO Art: Allow user to change respect of the function
    const fpa = diffedExpression === 'unknown'
      ? round(math.derivative(expression, 'x').evaluate({ x: a }), decimalPoint)
      : round(evaluateFunction(diffedExpression, a), decimalPoint)

    // * find c
    const c = round(a - (fa / fpa), decimalPoint)

    // * finc f(c)
    const fc = round(evaluateFunction(expression, c), decimalPoint)

    // * find error
    const error = round(absoluteError(c, previousC), decimalPoint)

    const answer: Answer = { i, a, fa, fpa, c, fc, error }

    answerArray.push(answer)

    // * next iteration, c becomes a
    a = c
    previousC = c
  }

  return answerArray
}
