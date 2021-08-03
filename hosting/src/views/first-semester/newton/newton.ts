import { Component, Vue, Watch } from 'vue-property-decorator'

import { NewtonQuerystring, NewtonResponse } from '@fina/common'

import GrapherComponent from '@/components/grapher/grapher.vue'
import { Coordinate } from '@/types'

@Component({
  components: {
    grapher: GrapherComponent
  }
})
export default class NewtonPage extends Vue {
  newtonInput: NewtonQuerystring = {
    expression: 'x^3 - 4x^2 + 1',
    diffedExpression: '3x^2 - 8x',
    respect: 'x',
    start: 0.5,
    iteration: 5,
    dp: 5
  }

  answer: NewtonResponse = [
    {
      i: 1,
      a: 0.5,
      fa: 0.125,
      fpa: -3.25,
      c: 0.5384615,
      fc: -0.0036412,
      error: 100
    },
    {
      i: 2,
      a: 0.5384615,
      fa: -0.0036412,
      fpa: -3.4378696,
      c: 0.5374024,
      fc: -0.0000028,
      error: 0.1970776
    },
    {
      i: 3,
      a: 0.5374024,
      fa: -0.0000028,
      fpa: -3.4328152,
      c: 0.5374016,
      fc: -1e-7,
      error: 0.0001489
    },
    {
      i: 4,
      a: 0.5374016,
      fa: -1e-7,
      fpa: -3.4328114,
      c: 0.5374016,
      fc: -1e-7,
      error: 0
    },
    {
      i: 5,
      a: 0.5374016,
      fa: -1e-7,
      fpa: -3.4328114,
      c: 0.5374016,
      fc: -1e-7,
      error: 0
    },
    {
      i: 6,
      a: 0.5374016,
      fa: -1e-7,
      fpa: -3.4328114,
      c: 0.5374016,
      fc: -1e-7,
      error: 0
    },
    {
      i: 7,
      a: 0.5374016,
      fa: -1e-7,
      fpa: -3.4328114,
      c: 0.5374016,
      fc: -1e-7,
      error: 0
    },
    {
      i: 8,
      a: 0.5374016,
      fa: -1e-7,
      fpa: -3.4328114,
      c: 0.5374016,
      fc: -1e-7,
      error: 0
    },
    {
      i: 9,
      a: 0.5374016,
      fa: -1e-7,
      fpa: -3.4328114,
      c: 0.5374016,
      fc: -1e-7,
      error: 0
    },
    {
      i: 10,
      a: 0.5374016,
      fa: -1e-7,
      fpa: -3.4328114,
      c: 0.5374016,
      fc: -1e-7,
      error: 0
    },
    {
      i: 11,
      a: 0.5374016,
      fa: -1e-7,
      fpa: -3.4328114,
      c: 0.5374016,
      fc: -1e-7,
      error: 0
    },
    {
      i: 12,
      a: 0.5374016,
      fa: -1e-7,
      fpa: -3.4328114,
      c: 0.5374016,
      fc: -1e-7,
      error: 0
    },
    {
      i: 13,
      a: 0.5374016,
      fa: -1e-7,
      fpa: -3.4328114,
      c: 0.5374016,
      fc: -1e-7,
      error: 0
    },
    {
      i: 14,
      a: 0.5374016,
      fa: -1e-7,
      fpa: -3.4328114,
      c: 0.5374016,
      fc: -1e-7,
      error: 0
    },
    {
      i: 15,
      a: 0.5374016,
      fa: -1e-7,
      fpa: -3.4328114,
      c: 0.5374016,
      fc: -1e-7,
      error: 0
    },
    {
      i: 16,
      a: 0.5374016,
      fa: -1e-7,
      fpa: -3.4328114,
      c: 0.5374016,
      fc: -1e-7,
      error: 0
    },
    {
      i: 17,
      a: 0.5374016,
      fa: -1e-7,
      fpa: -3.4328114,
      c: 0.5374016,
      fc: -1e-7,
      error: 0
    },
    {
      i: 18,
      a: 0.5374016,
      fa: -1e-7,
      fpa: -3.4328114,
      c: 0.5374016,
      fc: -1e-7,
      error: 0
    },
    {
      i: 19,
      a: 0.5374016,
      fa: -1e-7,
      fpa: -3.4328114,
      c: 0.5374016,
      fc: -1e-7,
      error: 0
    },
    {
      i: 20,
      a: 0.5374016,
      fa: -1e-7,
      fpa: -3.4328114,
      c: 0.5374016,
      fc: -1e-7,
      error: 0
    }
  ]

  katexAnswerDiv = false
  knowDiffedExpression = true

  get validateInputs (): boolean {
    if (this.newtonInput.expression == null || this.newtonInput.expression === '') {
      return true
    }

    if (this.newtonInput.iteration == null || this.newtonInput.dp == null) {
      return true
    }

    if (this.newtonInput.iteration < 0 || this.newtonInput.iteration > 100) {
      return true
    }

    // eslint-disable-next-line yoda
    if (!(0 <= this.newtonInput.dp && this.newtonInput.dp <= 15)) {
      return true
    }

    return false
  }

  get katexAnswerArray (): Array<Array<string>> {
    return this.answer.map(answer => {
      return [
        `i = ${answer.i}`,
        `x_{${answer.i}} = ${answer.a}`,
        `f(x_{${answer.i}}) = (${answer.a})^3 - 4(${answer.a})^2 + 1 = ${answer.fa}`,
        `x_{${answer.i + 1}} = ${answer.a} - \\frac{${answer.fa}}{${answer.fpa}} = ${answer.c}`,
        `f(x_{${answer.i + 1}}) = (${answer.c})^3 - 4(${answer.c})^2 + 1 = ${answer.fc}`
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

  @Watch('knowDiffedExpression')
  onKnowDiffedExpressionChange (): void {
    if (!this.knowDiffedExpression) {
      this.newtonInput.diffedExpression = ''
    }
  }

  toggleAnswer (): void {
    this.katexAnswerDiv = !this.katexAnswerDiv
  }

  resetInputsToDefault (): void {
    this.knowDiffedExpression = true
    this.newtonInput = {
      expression: 'x^3 - 4x^2 + 1',
      diffedExpression: '3x^2 - 8x',
      respect: 'x',
      start: 0.5,
      iteration: 5,
      dp: 5
    }
  }

  calculateNewtonInput (): void {
    if (this.newtonInput.iteration == null || this.newtonInput.dp == null) {
      return
    }

    this.$router.push({
      path: 'newton/calculate',
      query: {
        expression: this.newtonInput.expression,
        diffedExpression: this.newtonInput.diffedExpression ?? '',
        respect: this.newtonInput.respect,
        start: this.newtonInput.start.toString(),
        iteration: this.newtonInput.iteration.toString(),
        dp: this.newtonInput.dp.toString()
      }
    },
    () => {
      console.log('Calculate Newton Route Done')
    },
    (error) => {
      console.log(error)
    })
  }
}
