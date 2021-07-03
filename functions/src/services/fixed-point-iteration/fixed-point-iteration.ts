import { absoluteError, Answer, evaluateFunction, round } from '@fina/common'

export function iteration (expression: string, fixedExpression: string, a: number, iteration: number, decimalPoint: number): Array<Answer> {
  let previousC = 0
  const answerArray: Array<Answer> = []

  for (let i = 0; i < iteration; i++) {
    // * find f(a)
    const fa = round(evaluateFunction(expression, a), decimalPoint)

    // * find c
    const c = round(evaluateFunction(fixedExpression, a), decimalPoint)

    // * finc f(c)
    const fc = round(evaluateFunction(expression, c), decimalPoint)

    // * find error
    const error = round(absoluteError(c, previousC), decimalPoint)

    const answer: Answer = { i, a, fa, c, fc, error }
    answerArray.push(answer)

    // * next iteration, c becomes a
    a = c
    previousC = c
  }

  return answerArray
}
