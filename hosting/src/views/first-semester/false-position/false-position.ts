import { Component, Vue } from 'vue-property-decorator'

import { FalsePositionResponse } from '@fina/common'

import GrapherComponent from '@/components/grapher/grapher.vue'
import { Coordinate } from '@/types'

@Component({
  metaInfo () {
    return {
      title: 'False Position | FINA'
    }
  },
  components: {
    grapher: GrapherComponent
  }
})
export default class FalsePositionPage extends Vue {
  falsePositionInput = {
    expression: 'x^2 - 2x - 3',
    start: '2',
    end: '3.2',
    iteration: '5',
    dp: '5'
  }

  answer: FalsePositionResponse = [
    {
      i: 0,
      a: -2,
      b: 0,
      fa: 5,
      fb: -1,
      c: -0.3333333,
      fc: -0.5555556,
      error: 100
    },
    {
      i: 1,
      a: -2,
      b: -0.3333333,
      fa: 5,
      fb: -0.5555556,
      c: -0.5,
      fc: -0.25,
      error: 33.33334
    },
    {
      i: 2,
      a: -2,
      b: -0.5,
      fa: 5,
      fb: -0.25,
      c: -0.5714286,
      fc: -0.1020408,
      error: 12.5000044
    },
    {
      i: 3,
      a: -2,
      b: -0.5714286,
      fa: 5,
      fb: -0.1020408,
      c: -0.6,
      fc: -0.04,
      error: 4.7619
    },
    {
      i: 4,
      a: -2,
      b: -0.6,
      fa: 5,
      fb: -0.04,
      c: -0.6111111,
      fc: -0.0154321,
      error: 1.81818
    },
    {
      i: 5,
      a: -2,
      b: -0.6111111,
      fa: 5,
      fb: -0.0154321,
      c: -0.6153846,
      fc: -0.0059172,
      error: 0.6944438
    },
    {
      i: 6,
      a: -2,
      b: -0.6153846,
      fa: 5,
      fb: -0.0059172,
      c: -0.6170213,
      fc: -0.0022634,
      error: 0.2652583
    },
    {
      i: 7,
      a: -2,
      b: -0.6170213,
      fa: 5,
      fb: -0.0022634,
      c: -0.6176471,
      fc: -0.000865,
      error: 0.10132
    },
    {
      i: 8,
      a: -2,
      b: -0.6176471,
      fa: 5,
      fb: -0.000865,
      c: -0.6178862,
      fc: -0.0003304,
      error: 0.0386964
    },
    {
      i: 9,
      a: -2,
      b: -0.6178862,
      fa: 5,
      fb: -0.0003304,
      c: -0.6179775,
      fc: -0.0001263,
      error: 0.014774
    },
    {
      i: 10,
      a: -2,
      b: -0.6179775,
      fa: 5,
      fb: -0.0001263,
      c: -0.6180124,
      fc: -0.0000483,
      error: 0.0056471
    },
    {
      i: 11,
      a: -2,
      b: -0.6180124,
      fa: 5,
      fb: -0.0000483,
      c: -0.6180257,
      fc: -0.0000185,
      error: 0.002152
    },
    {
      i: 12,
      a: -2,
      b: -0.6180257,
      fa: 5,
      fb: -0.0000185,
      c: -0.6180308,
      fc: -0.0000071,
      error: 0.0008252
    },
    {
      i: 13,
      a: -2,
      b: -0.6180308,
      fa: 5,
      fb: -0.0000071,
      c: -0.6180328,
      fc: -0.0000027,
      error: 0.0003236
    },
    {
      i: 14,
      a: -2,
      b: -0.6180328,
      fa: 5,
      fb: -0.0000027,
      c: -0.6180335,
      fc: -0.0000011,
      error: 0.0001133
    },
    {
      i: 15,
      a: -2,
      b: -0.6180335,
      fa: 5,
      fb: -0.0000011,
      c: -0.6180338,
      fc: -4e-7,
      error: 0.0000485
    },
    {
      i: 16,
      a: -2,
      b: -0.6180338,
      fa: 5,
      fb: -4e-7,
      c: -0.6180339,
      fc: -2e-7,
      error: 0.0000162
    },
    {
      i: 17,
      a: -2,
      b: -0.6180339,
      fa: 5,
      fb: -2e-7,
      c: -0.618034,
      fc: 0,
      error: 0.0000162
    },
    {
      i: 18,
      a: -2,
      b: -0.6180339,
      fa: 5,
      fb: -2e-7,
      c: -0.618034,
      fc: 0,
      error: 0
    },
    {
      i: 19,
      a: -2,
      b: -0.6180339,
      fa: 5,
      fb: -2e-7,
      c: -0.618034,
      fc: 0,
      error: 0
    }
  ]

  katexAnswerDiv = false

  get points (): Array<Coordinate> {
    return this.answer.map(answer => {
      return {
        x: answer.c,
        y: answer.fc
      }
    })
  }

  get validateInputs (): boolean {
    if (this.falsePositionInput.expression === '' || this.falsePositionInput.start === '' || this.falsePositionInput.end === '') {
      return true
    }

    if (Number(this.falsePositionInput.end) < Number(this.falsePositionInput.start)) {
      return true
    }

    if (Number(this.falsePositionInput.iteration) < 0 || Number(this.falsePositionInput.iteration) > 100) {
      return true
    }

    // eslint-disable-next-line yoda
    if (!(0 <= Number(this.falsePositionInput.dp) && Number(this.falsePositionInput.dp) <= 15)) {
      return true
    }

    return false
  }

  get katexAnswerArray (): Array<Array<string>> {
    return this.answer.map(answer => {
      return [
        `i = ${answer.i + 1}`,
        `c = \\frac{(${answer.a} \\cdot ${answer.fb}) - (${answer.b} \\cdot ${answer.fa})}{${answer.fb} - ${answer.fa}}`,
        `c = ${answer.c}`,
        `f(c) = (${answer.c})^2 - ${answer.c} - 1 = ${answer.fc}`
      ]
    })
  }

  get assertedDefaults (): Record<string, string> {
    return {
      expression: this.falsePositionInput.expression,
      start: this.falsePositionInput.start,
      end: this.falsePositionInput.end,
      iteration: this.falsePositionInput.iteration === '' ? '5' : this.falsePositionInput.iteration,
      dp: this.falsePositionInput.dp === '' ? '5' : this.falsePositionInput.dp
    }
  }

  resetInputsToDefault (): void {
    this.falsePositionInput = {
      expression: 'x^2 - 2x - 3',
      start: '2',
      end: '3.2',
      iteration: '5',
      dp: '5'
    }
  }

  calculateFalsePosition (): void {
    this.$router.push({
      path: 'false-position/calculate',
      query: this.assertedDefaults
    },
    () => {
      console.log('Calculate False Position Route Done')
    },
    (error) => {
      console.error(error)
    })
  }

  toggleAnswer (): void {
    this.katexAnswerDiv = !this.katexAnswerDiv
  }
}
