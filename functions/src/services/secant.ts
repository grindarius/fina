import { absoluteError, Answer, evaluateFunction, round } from '@fina/common'

export function secantIteration (expression: string, a: number, b: number, iteration: number, decimalPoint: number): Array<Answer> {
  let previousC = 0
  const answerArray: Array<Answer> = []

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

    const answer: Answer = { i, a, b, fa, fb, c, fc, error }
    answerArray.push(answer)

    // * a becomes b, b becomes c
    a = b
    b = c
    previousC = c
  }

  return answerArray
}
