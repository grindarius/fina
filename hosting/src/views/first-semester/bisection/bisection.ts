import { Component, Vue } from 'vue-property-decorator'

import { BisectionResponse } from '@fina/common'

import GrapherComponent from '@/components/grapher/grapher.vue'
import { Coordinate } from '@/types'

@Component({
  metaInfo () {
    return {
      title: 'Bisection | FINA'
    }
  },
  components: {
    grapher: GrapherComponent
  }
})
export default class BisectionPage extends Vue {
  bisectionInput = {
    expression: 'x^3 - x - 1',
    start: '1',
    end: '3',
    iteration: '5',
    dp: '5'
  }

  answer: BisectionResponse = [
    {
      i: 0,
      a: 1,
      b: 2,
      fa: -5,
      fb: 14,
      c: 1.5,
      fc: 2.375,
      error: 100
    },
    {
      i: 1,
      a: 1,
      b: 1.5,
      fa: -5,
      fb: 2.375,
      c: 1.25,
      fc: -1.796875,
      error: 20
    },
    {
      i: 2,
      a: 1.25,
      b: 1.5,
      fa: -1.796875,
      fb: 2.375,
      c: 1.375,
      fc: 0.16210938,
      error: 9.09090909
    },
    {
      i: 3,
      a: 1.25,
      b: 1.375,
      fa: -1.796875,
      fb: 0.16210938,
      c: 1.3125,
      fc: -0.84838867,
      error: 4.76190476
    },
    {
      i: 4,
      a: 1.3125,
      b: 1.375,
      fa: -0.84838867,
      fb: 0.16210938,
      c: 1.34375,
      fc: -0.35098267,
      error: 2.3255814
    },
    {
      i: 5,
      a: 1.34375,
      b: 1.375,
      fa: -0.35098267,
      fb: 0.16210938,
      c: 1.359375,
      fc: -0.09640884,
      error: 1.14942529
    },
    {
      i: 6,
      a: 1.359375,
      b: 1.375,
      fa: -0.09640884,
      fb: 0.16210938,
      c: 1.3671875,
      fc: 0.03235579,
      error: 0.57142857
    },
    {
      i: 7,
      a: 1.359375,
      b: 1.3671875,
      fa: -0.09640884,
      fb: 0.03235579,
      c: 1.36328125,
      fc: -0.03214997,
      error: 0.28653295
    },
    {
      i: 8,
      a: 1.36328125,
      b: 1.3671875,
      fa: -0.03214997,
      fb: 0.03235579,
      c: 1.36523438,
      fc: 0.00007211,
      error: 0.14306188
    },
    {
      i: 9,
      a: 1.36328125,
      b: 1.36523438,
      fa: -0.03214997,
      fb: 0.00007211,
      c: 1.36425782,
      fc: -0.01604657,
      error: 0.07158178
    },
    {
      i: 10,
      a: 1.36425782,
      b: 1.36523438,
      fa: -0.01604657,
      fb: 0.00007211,
      c: 1.3647461,
      fc: -0.00798916,
      error: 0.03577808
    },
    {
      i: 11,
      a: 1.3647461,
      b: 1.36523438,
      fa: -0.00798916,
      fb: 0.00007211,
      c: 1.36499024,
      fc: -0.00395901,
      error: 0.01788584
    },
    {
      i: 12,
      a: 1.36499024,
      b: 1.36523438,
      fa: -0.00395901,
      fb: 0.00007211,
      c: 1.36511231,
      fc: -0.00194357,
      error: 0.00894212
    },
    {
      i: 13,
      a: 1.36511231,
      b: 1.36523438,
      fa: -0.00194357,
      fb: 0.00007211,
      c: 1.36517335,
      fc: -0.00093568,
      error: 0.00447123
    },
    {
      i: 14,
      a: 1.36517335,
      b: 1.36523438,
      fa: -0.00093568,
      fb: 0.00007211,
      c: 1.36520387,
      fc: -0.00043171,
      error: 0.00223556
    },
    {
      i: 15,
      a: 1.36520387,
      b: 1.36523438,
      fa: -0.00043171,
      fb: 0.00007211,
      c: 1.36521913,
      fc: -0.00017972,
      error: 0.00111777
    },
    {
      i: 16,
      a: 1.36521913,
      b: 1.36523438,
      fa: -0.00017972,
      fb: 0.00007211,
      c: 1.36522676,
      fc: -0.00005372,
      error: 0.00055888
    },
    {
      i: 17,
      a: 1.36522676,
      b: 1.36523438,
      fa: -0.00005372,
      fb: 0.00007211,
      c: 1.36523057,
      fc: 0.00000919,
      error: 0.00027907
    },
    {
      i: 18,
      a: 1.36522676,
      b: 1.36523057,
      fa: -0.00005372,
      fb: 0.00000919,
      c: 1.36522867,
      fc: -0.00002218,
      error: 0.00013917
    },
    {
      i: 19,
      a: 1.36522867,
      b: 1.36523057,
      fa: -0.00002218,
      fb: 0.00000919,
      c: 1.36522962,
      fc: -0.0000065,
      error: 0.00006959
    }
  ]

  katexAnswerDiv = false

  get katexAnswerArray (): Array<Array<string>> {
    return this.answer.map(answer => {
      return [
        `i = ${answer.i + 1}`,
        `c = \\frac{${answer.a} + ${answer.b}}{2}`,
        `c = ${answer.c}`,
        `f(c) = (${answer.c})^3 + 4((${answer.c})^2) - 10 = ${answer.fc}`
      ]
    })
  }

  get points (): Array<Coordinate> {
    return this.answer.map(answer => {
      return {
        x: answer.c ?? 0,
        y: answer.fc ?? 0
      }
    })
  }

  get validateInputs (): boolean {
    if (this.bisectionInput.expression === '' || this.bisectionInput.start === '' || this.bisectionInput.end === '') {
      return true
    }

    if (Number(this.bisectionInput.end) < Number(this.bisectionInput.start)) {
      return true
    }

    if (Number(this.bisectionInput.iteration) < 0 || Number(this.bisectionInput.iteration) > 100) {
      return true
    }

    // eslint-disable-next-line yoda
    if (!(0 <= Number(this.bisectionInput.dp) && Number(this.bisectionInput.dp) <= 15)) {
      return true
    }

    return false
  }

  get assertedDefaults (): Record<string, string> {
    return {
      expression: this.bisectionInput.expression,
      start: this.bisectionInput.start,
      end: this.bisectionInput.end,
      iteration: this.bisectionInput.iteration === '' ? '5' : this.bisectionInput.iteration,
      dp: this.bisectionInput.dp === '' ? '5' : this.bisectionInput.dp
    }
  }

  toggleAnswer (): void {
    this.katexAnswerDiv = !this.katexAnswerDiv
  }

  resetInputsToDefault (): void {
    this.bisectionInput = {
      expression: 'x^3 - x - 1',
      start: '1',
      end: '3',
      iteration: '5',
      dp: '5'
    }
  }

  calculateBisection (): void {
    this.$router.push({
      path: 'bisection/calculate',
      query: this.assertedDefaults
    },
    () => {
      console.log('Calculate Bisection Route Done')
    },
    (error) => {
      console.error(error)
    })
  }
}
