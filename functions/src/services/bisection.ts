import { absoluteError, BisectionResponse, BisectionResponseObject, compileFunction, isNumberReal, round } from '@fina/common'

export function bisectionIteration (expression: string, a: number, b: number, iteration: number, decimalPoint: number): BisectionResponse {
  let previousC = 0
  const answerArray: BisectionResponse = []
  const mathCode = compileFunction(expression)

  for (let i = 1; i <= iteration; i++) {
    // * find f(a), f(b)
    const fa = round(mathCode.evaluate({ x: a }), decimalPoint)
    const fb = round(mathCode.evaluate({ x: b }), decimalPoint)

    // * find c
    const cExpression = (a + b) / 2
    const c = round(cExpression, decimalPoint)

    if (!isNumberReal(c)) {
      break
    }

    // * find f(c)
    const fc = round(mathCode.evaluate({ x: c }), decimalPoint)

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
