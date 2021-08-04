import { Component, Vue } from 'vue-property-decorator'

import { SecantResponse } from '@fina/common'

import GrapherComponent from '@/components/grapher/grapher.vue'
import { Coordinate } from '@/types'

@Component({
  metaInfo () {
    return {
      title: 'Secant | FINA'
    }
  },
  components: {
    grapher: GrapherComponent
  }
})
export default class SecantPage extends Vue {
  answer: SecantResponse = [
    {
      i: 1,
      a: 2,
      b: 4,
      fa: -872,
      fb: 15384,
      c: 2.1072835,
      fc: -815.4726408,
      error: 100
    },
    {
      i: 2,
      a: 4,
      b: 2.1072835,
      fa: 15384,
      fb: -815.4726408,
      c: 2.2025618,
      fc: -748.5238982,
      error: 4.3257946
    },
    {
      i: 3,
      a: 2.1072835,
      b: 2.2025618,
      fa: -815.4726408,
      fb: -748.5238982,
      c: 3.2678258,
      fc: 2979.3513023,
      error: 32.5985553
    },
    {
      i: 4,
      a: 2.2025618,
      b: 3.2678258,
      fa: -748.5238982,
      fb: 2979.3513023,
      c: 2.4164573,
      fc: -518.879483,
      error: 35.2320937
    },
    {
      i: 5,
      a: 3.2678258,
      b: 2.4164573,
      fa: 2979.3513023,
      fb: -518.879483,
      c: 2.5427376,
      fc: -312.7562235,
      error: 4.9663127
    },
    {
      i: 6,
      a: 2.4164573,
      b: 2.5427376,
      fa: -518.879483,
      fb: -312.7562235,
      c: 2.734346,
      fc: 142.8106546,
      error: 7.0074672
    },
    {
      i: 7,
      a: 2.5427376,
      b: 2.734346,
      fa: -312.7562235,
      fb: 142.8106546,
      c: 2.6742808,
      fc: -21.7518297,
      error: 2.2460319
    },
    {
      i: 8,
      a: 2.734346,
      b: 2.6742808,
      fa: 142.8106546,
      fb: -21.7518297,
      c: 2.6822202,
      fc: -1.2403184,
      error: 0.2960011
    },
    {
      i: 9,
      a: 2.6742808,
      b: 2.6822202,
      fa: -21.7518297,
      fb: -1.2403184,
      c: 2.6827003,
      fc: 0.0117543,
      error: 0.0178961
    },
    {
      i: 10,
      a: 2.6822202,
      b: 2.6827003,
      fa: -1.2403184,
      fb: 0.0117543,
      c: 2.6826958,
      fc: 0.0000123,
      error: 0.0001677
    },
    {
      i: 11,
      a: 2.6827003,
      b: 2.6826958,
      fa: 0.0117543,
      fb: 0.0000123,
      c: 2.6826958,
      fc: 0.0000123,
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

  get katexAnswerArray (): Array<Array<string>> {
    return this.answer.map(answer => {
      return [
        `i = ${answer.i}`,
        `f(a) = (${answer.a})^7 - 1000 = ${answer.fa}`,
        `f(b) = (${answer.b})^7 - 1000 = ${answer.fb}`,
        `c = \\frac{(${answer.a} \\cdot ${answer.fb}) - (${answer.b} \\cdot ${answer.fa})}{${answer.fb} - (${answer.fa})} = ${answer.c}`,
        `f(c) = (${answer.c})^7 - 1000 = ${answer.fc}`
      ]
    })
  }

  toggleAnswer (): void {
    this.katexAnswerDiv = !this.katexAnswerDiv
  }
}
