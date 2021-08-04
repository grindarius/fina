import { absoluteError, compileFunction, isNumberReal, round, SecantResponse, SecantResponseObject } from '@fina/common'

export function secantIteration (expression: string, a: number, b: number, iteration: number, decimalPoint: number): SecantResponse {
  let previousC = 0
  const answerArray: SecantResponse = []
  const mathCode = compileFunction(expression)

  for (let i = 1; i <= iteration; i++) {
    // * find f(a), f(b)
    const fa = round(mathCode.evaluate({ x: a }), decimalPoint)
    const fb = round(mathCode.evaluate({ x: b }), decimalPoint)

    // * find c
    const cExpression = ((a * fb) - (b * fa)) / (fb - fa)
    const c = round(cExpression, decimalPoint)

    if (isNumberReal(c)) {
      break
    }

    // * find f(c)
    const fc = round(mathCode.evaluate({ x: c }), decimalPoint)

    // * find error
    const error = round(absoluteError(c, previousC), decimalPoint)

    const answer: SecantResponseObject = { i, a, b, fa, fb, c, fc, error }
    answerArray.push(answer)

    // * a becomes b, b becomes c
    a = b
    b = c
    previousC = c
  }

  return answerArray
}
