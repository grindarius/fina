import { absoluteError, evaluateFunction, FalsePositionResponse, FalsePositionResponseObject, round } from '@fina/common'

export function falsePositionIteration (expression: string, a: number, b: number, iteration: number, decimalPoint: number): FalsePositionResponse {
  let previousC = 0
  const answerArray: FalsePositionResponse = []

  for (let i = 0; i < iteration; i++) {
    // * find f(a), f(b)
    const fa = round(evaluateFunction(expression, a), decimalPoint)
    const fb = round(evaluateFunction(expression, b), decimalPoint)

    // * find c
    const cExpression = ((a * fb) - (b * fa)) / (fb - fa)
    const c = round(cExpression, decimalPoint)

    // * find f(c)
    const fc = round(evaluateFunction(expression, c), decimalPoint)

    // * find error
    const error = round(absoluteError(c, previousC), decimalPoint)

    const answer: FalsePositionResponseObject = { i, a, b, fa, fb, c, fc, error }
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
