import { absoluteError, evaluateFunction, FixedPointIterationResponse, FixedPointIterationResponseObject, round } from '@fina/common'

export function fixedPointIteration (expression: string, fixedExpression: string, a: number, iteration: number, decimalPoint: number): FixedPointIterationResponse {
  let previousC = 0
  const answerArray: FixedPointIterationResponse = []

  for (let i = 0; i < iteration; i++) {
    // * find f(a)
    const fa = round(evaluateFunction(expression, { x: a }), decimalPoint)

    // * find c
    const c = round(evaluateFunction(fixedExpression, { x: a }), decimalPoint)

    // * finc f(c)
    const fc = round(evaluateFunction(expression, { x: c }), decimalPoint)

    // * find error
    const error = round(absoluteError(c, previousC), decimalPoint)

    const answer: FixedPointIterationResponseObject = { i, a, fa, c, fc, error }
    answerArray.push(answer)

    // * next iteration, c becomes a
    a = c
    previousC = c
  }

  return answerArray
}
