import { Component, Vue } from 'vue-property-decorator'

import { FixedPointIterationQuerystring, FixedPointIterationResponse } from '@fina/common'

import GrapherComponent from '@/components/grapher/grapher.vue'
import { Coordinate } from '@/types'

@Component({
  metaInfo () {
    return {
      title: 'Fixed Point Iteration | FINA'
    }
  },
  components: {
    grapher: GrapherComponent
  }
})
export default class FixedPointIterationPage extends Vue {
  fixedPointIterationInput: FixedPointIterationQuerystring = {
    expression: 'x^2 - x - 1',
    fixedExpression: '1 + (1/x)',
    start: 2,
    checkConvergence: 'true',
    iteration: 5,
    dp: 5
  }

  answer: FixedPointIterationResponse = [
    {
      i: 1,
      a: 2,
      fa: 1,
      c: 1.5,
      fc: -0.25,
      error: 100
    },
    {
      i: 2,
      a: 1.5,
      fa: -0.25,
      c: 1.6666667,
      fc: 0.1111112,
      error: 10.0000018
    },
    {
      i: 3,
      a: 1.6666667,
      fa: 0.1111112,
      c: 1.6,
      fc: -0.04,
      error: 4.1666687
    },
    {
      i: 4,
      a: 1.6,
      fa: -0.04,
      c: 1.625,
      fc: 0.015625,
      error: 1.5384615
    },
    {
      i: 5,
      a: 1.625,
      fa: 0.015625,
      c: 1.6153846,
      fc: -0.0059172,
      error: 0.5952391
    },
    {
      i: 6,
      a: 1.6153846,
      fa: -0.0059172,
      c: 1.6190476,
      fc: 0.0022675,
      error: 0.2262441
    },
    {
      i: 7,
      a: 1.6190476,
      fa: 0.0022675,
      c: 1.6176471,
      fc: -0.000865,
      error: 0.0865764
    },
    {
      i: 8,
      a: 1.6176471,
      fa: -0.000865,
      c: 1.6181818,
      fc: 0.0003305,
      error: 0.0330433
    },
    {
      i: 9,
      a: 1.6181818,
      fa: 0.0003305,
      c: 1.6179775,
      fc: -0.0001263,
      error: 0.0126269
    },
    {
      i: 10,
      a: 1.6179775,
      fa: -0.0001263,
      c: 1.6180556,
      fc: 0.0000483,
      error: 0.0048268
    },
    {
      i: 11,
      a: 1.6180556,
      fa: 0.0000483,
      c: 1.6180257,
      fc: -0.0000185,
      error: 0.0018479
    },
    {
      i: 12,
      a: 1.6180257,
      fa: -0.0000185,
      c: 1.6180372,
      fc: 0.0000072,
      error: 0.0007107
    },
    {
      i: 13,
      a: 1.6180372,
      fa: 0.0000072,
      c: 1.6180328,
      fc: -0.0000027,
      error: 0.0002719
    },
    {
      i: 14,
      a: 1.6180328,
      fa: -0.0000027,
      c: 1.6180344,
      fc: 9e-7,
      error: 0.0000989
    },
    {
      i: 15,
      a: 1.6180344,
      fa: 9e-7,
      c: 1.6180338,
      fc: -4e-7,
      error: 0.0000371
    },
    {
      i: 16,
      a: 1.6180338,
      fa: -4e-7,
      c: 1.6180341,
      fc: 2e-7,
      error: 0.0000185
    },
    {
      i: 17,
      a: 1.6180341,
      fa: 2e-7,
      c: 1.6180339,
      fc: -2e-7,
      error: 0.0000124
    },
    {
      i: 18,
      a: 1.6180339,
      fa: -2e-7,
      c: 1.618034,
      fc: 0,
      error: 0.0000062
    },
    {
      i: 19,
      a: 1.618034,
      fa: 0,
      c: 1.618034,
      fc: 0,
      error: 0
    },
    {
      i: 20,
      a: 1.618034,
      fa: 0,
      c: 1.618034,
      fc: 0,
      error: 0
    }
  ]

  katexAnswerDiv = false

  get katexAnswerArray (): Array<Array<string>> {
    return this.answer.map(answer => {
      return [
        `i = ${answer.i}`,
        `x_{${answer.i}} = ${answer.a}`,
        `f(x_{${answer.i}}) = (${answer.a})^2 - ${answer.a} - 1 = ${answer.fa}`,
        `x_{${answer.i + 1}} = 1 + \\frac{1}{${answer.a}} = ${answer.c}`,
        `f(x_{${answer.i + 1}}) = (${answer.c})^2 - ${answer.c} - 1 = ${answer.fc}`
      ]
    })
  }

  get points (): Array<Coordinate> {
    return this.answer.map(answer => {
      return {
        x: answer.c,
        y: answer.fc
      }
    })
  }

  get validateInputs (): boolean {
    if (this.fixedPointIterationInput.expression == null || this.fixedPointIterationInput.expression === '') {
      return true
    }

    if (this.fixedPointIterationInput.fixedExpression == null || this.fixedPointIterationInput.fixedExpression === '') {
      return true
    }

    if (this.fixedPointIterationInput.iteration == null || this.fixedPointIterationInput.dp == null) {
      return true
    }

    if (this.fixedPointIterationInput.iteration < 0 || this.fixedPointIterationInput.iteration > 100) {
      return true
    }

    // eslint-disable-next-line yoda
    if (!(0 <= this.fixedPointIterationInput.dp && this.fixedPointIterationInput.dp <= 15)) {
      return true
    }

    return false
  }

  toggleAnswer (): void {
    this.katexAnswerDiv = !this.katexAnswerDiv
  }

  resetInputsToDefault (): void {
    this.fixedPointIterationInput = {
      expression: 'x^2 - x - 1',
      fixedExpression: '1 + (1/x)',
      start: 2,
      checkConvergence: 'true',
      iteration: 5,
      dp: 5
    }
  }

  calculateFixedPointIteration (): void {
    if (this.fixedPointIterationInput.iteration == null || this.fixedPointIterationInput.dp == null) {
      return
    }

    this.$router.push({
      path: 'fixed-point-iteration/calculate',
      query: {
        expression: this.fixedPointIterationInput.expression,
        fixedExpression: this.fixedPointIterationInput.fixedExpression,
        start: this.fixedPointIterationInput.start.toString(),
        checkConvergence: this.fixedPointIterationInput.checkConvergence.toString(),
        iteration: this.fixedPointIterationInput.iteration.toString(),
        dp: this.fixedPointIterationInput.dp.toString()
      }
    },
    () => {
      console.log('Calculate Fixed Point Iteration Route Done')
    },
    (error) => {
      console.error(error)
    })
  }
}
