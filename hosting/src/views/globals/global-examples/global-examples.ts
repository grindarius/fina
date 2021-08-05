import { Component, Vue } from 'vue-property-decorator'

import FooterComponent from '@/components/footer/footer.vue'

interface TwoPointEquation {
  equation: string
  equationLatex: string
  start: string
  end: string
}

interface NewtonEquation {
  equation: string
  equationLatex: string
  diffedEquation: string
  start: string
}

interface EquationSubCollection {
  url: string
  questions: Array<TwoPointEquation>
}

interface TwoPointEquationCollection {
  'Bisection': EquationSubCollection
  'False Position': EquationSubCollection
  'Secant': EquationSubCollection
}

interface NewtonEquationCollection {
  url: string
  questions: Array<NewtonEquation>
}

@Component({
  metaInfo () {
    return {
      title: 'Examples | FINA'
    }
  },
  components: {
    'breadcrumb-footer': FooterComponent
  }
})
export default class GlobalExamplesPage extends Vue {
  twoPointEquations: TwoPointEquationCollection = {
    'Bisection': {
      url: '/docs/bisection/calculate',
      questions: [
        {
          equation: 'cos(x) - x * e^x',
          equationLatex: '\\cos(x) - x \\cdot e^x',
          start: '0',
          end: '1'
        },
        {
          equation: 'x^4 - x - 10',
          equationLatex: 'x^4 - x - 10',
          start: '1.5',
          end: '2'
        },
        {
          equation: 'x - e^(-x)',
          equationLatex: 'x - e^{(-x)}',
          start: '0',
          end: '1'
        },
        {
          equation: 'e^(-x) * (x^2 + 5x + 2) + 1',
          equationLatex: 'e^{(-x)} \\cdot (x^2 + 5x + 2) + 1',
          start: '-1',
          end: '0'
        },
        {
          equation: 'x - sin(x) - 0.5',
          equationLatex: 'x - \\sin(x) - 0.5',
          start: '1',
          end: '2'
        },
        {
          equation: '3x + sin(x) - e^x',
          equationLatex: '3x + \\sin(x) - e^x',
          start: '0',
          end: '1'
        },
        {
          equation: 'x^2 - 3',
          equationLatex: 'x^2 - 3',
          start: '1',
          end: '2'
        }
      ]
    },
    'False Position': {
      url: '/docs/false-position/calculate',
      questions: [
        {
          equation: '3x - cos(x) - 1',
          equationLatex: '3x - \\cos(x) - 1',
          start: '0',
          end: '1'
        },
        {
          equation: 'x^3 + 2x^2 + 10x - 20',
          equationLatex: 'x^3 + 2x^2 + 10x - 20',
          start: '1',
          end: '2'
        },
        {
          equation: '3x + sin(x) - e^x',
          equationLatex: '3x + \\sin(x) - e^x',
          start: '0',
          end: '1'
        },
        {
          equation: 'x - cos(x)',
          equationLatex: 'x - \\cos(x)',
          start: '0',
          end: '2'
        },
        {
          equation: 'x * e^x - 3',
          equationLatex: 'x \\cdot e^x - 3',
          start: '0',
          end: '2'
        },
        {
          equation: '4x - e^x',
          equationLatex: '4x - e^x',
          start: '0',
          end: '1'
        },
        {
          equation: 'x^3 - 4x - 9',
          equationLatex: 'x^3 - 4x - 9',
          start: '2',
          end: '4'
        }
      ]
    },
    'Secant': {
      url: '/docs/secant/calculate',
      questions: [
        {
          equation: 'x^2 - 4x + 4',
          equationLatex: 'x^2 - 4x + 4',
          start: '2.5',
          end: '3'
        },
        {
          equation: 'x^2 - 4x + 4',
          equationLatex: 'x^2 - 4x + 4',
          start: '2',
          end: '3'
        },
        {
          equation: 'x^4 - x - 8',
          equationLatex: 'x^4 - x - 8',
          start: '1',
          end: '2'
        }
      ]
    }
  }

  newtonEquations: NewtonEquationCollection = {
    url: '/docs/newton/calculate',
    questions: [
      {
        equation: 'x^3 - x^2 + 4x - 4',
        equationLatex: 'x^3 - x^2 + 4x - 4',
        diffedEquation: '3x^2 - 2x + 4',
        start: '2'
      },
      {
        equation: 'x^2 - 153',
        equationLatex: 'x^2 - 153',
        diffedEquation: '2x',
        start: '0.5'
      },
      {
        equation: 'x^2 - 4',
        equationLatex: 'x^2 - 4',
        diffedEquation: '2x',
        start: '6'
      }
    ]
  }

  get separatedTwoPointEquations (): Array<[string, EquationSubCollection]> {
    return Object.entries(this.twoPointEquations)
  }
}
