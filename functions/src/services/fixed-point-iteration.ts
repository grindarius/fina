import { absoluteError, compileFunction, FixedPointIterationResponse, FixedPointIterationResponseObject, round } from '@fina/common'

export function fixedPointIterationIteration (expression: string, fixedExpression: string, a: number, iteration: number, decimalPoint: number): FixedPointIterationResponse {
  let previousC = 0
  const answerArray: FixedPointIterationResponse = []
  const mathCodeBaseFunction = compileFunction(expression)
  const mathCodeFixedFunction = compileFunction(fixedExpression)

  for (let i = 1; i <= iteration; i++) {
    // * find f(a)
    const fa = round(mathCodeBaseFunction.evaluate({ x: a }), decimalPoint)

    // * find c
    const c = round(mathCodeFixedFunction.evaluate({ x: a }), decimalPoint)

    // * finc f(c)
    const fc = round(mathCodeBaseFunction.evaluate({ x: c }), decimalPoint)

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
