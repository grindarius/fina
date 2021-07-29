import { absoluteError, BisectionResponse, BisectionResponseObject, evaluateFunction, round } from '@fina/common'

export function bisectionIteration (expression: string, a: number, b: number, iteration: number, decimalPoint: number): BisectionResponse {
  let previousC = 0
  const answerArray: BisectionResponse = []

  for (let i = 0; i < iteration; i++) {
    // * find f(a), f(b)
    const fa = round(evaluateFunction(expression, { x: a }), decimalPoint)
    const fb = round(evaluateFunction(expression, { x: b }), decimalPoint)

    // * find c
    const cExpression = (a + b) / 2
    const c = round(cExpression, decimalPoint)

    // * find f(c)
    const fc = round(evaluateFunction(expression, { x: c }), decimalPoint)

    // * find error
    const error = round(absoluteError(c, previousC), decimalPoint)

    const answer: BisectionResponseObject = { i, a, b, fa, fb, c, fc, error }
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
