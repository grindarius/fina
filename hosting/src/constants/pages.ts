import { Page } from '@/types'

const pathPrefix = '/docs'
const path = {
  gettingStarted: pathPrefix,
  significantDigits: `${pathPrefix}/significant-digits`,
  decimalPoints: `${pathPrefix}/decimal-points`,
  bisection: `${pathPrefix}/bisection`,
  falsePosition: `${pathPrefix}/false-position`,
  fixedPointIteration: `${pathPrefix}/fixed-point-iteration`
}

export const firstSemesterPages: Array<Page> = [
  {
    name: 'Getting started',
    path: path.gettingStarted,
    components: [
      {
        name: 'What is FINA',
        path: `${path.gettingStarted}#what-is-fina`
      },
      {
        name: 'Features',
        path: `${path.gettingStarted}#features`
      }
    ]
  },
  {
    name: 'Significant Digits',
    path: path.significantDigits,
    components: [
      {
        name: 'Description',
        path: `${path.significantDigits}#description`
      },
      {
        name: 'Rules',
        path: `${path.significantDigits}#rules`
      },
      {
        name: 'Examples',
        path: `${path.significantDigits}#examples`
      },
      {
        name: 'Calculate Significant Digits in a number',
        path: `${path.significantDigits}#calculate-sd-in-number`
      },
      {
        name: 'Rounding a number to a desired Significant Digits',
        path: `${path.significantDigits}#round-to-sd`
      },
      {
        name: 'Rules',
        path: `${path.significantDigits}#round-to-sd-rules`
      },
      {
        name: 'Examples',
        path: `${path.significantDigits}#round-to-sd-examples`
      },
      {
        name: 'Round a number to a desired Significant Digits',
        path: `${path.significantDigits}#calculate-round-to-sd`
      }
    ]
  },
  {
    name: 'Decimal Points',
    path: path.decimalPoints,
    components: [
      {
        name: 'Description',
        path: `${path.decimalPoints}#description`
      },
      {
        name: 'Examples',
        path: `${path.decimalPoints}#examples`
      },
      {
        name: 'Round to decimal points',
        path: `${path.decimalPoints}#round-to-dp`
      }
    ]
  },
  {
    name: 'Bisection',
    path: path.bisection,
    components: [
      {
        name: 'Description',
        path: `${path.bisection}#description`
      },
      {
        name: 'Input Constraints',
        path: `${path.bisection}#constraints`
      },
      {
        name: 'Steps to Reproduce',
        path: `${path.bisection}#steps`
      },
      {
        name: 'Examples',
        path: `${path.bisection}#examples`
      },
      {
        name: 'Calculate',
        path: `${path.bisection}#calculate`
      }
    ]
  },
  {
    name: 'False Position',
    path: path.falsePosition,
    components: [
      {
        name: 'Desription',
        path: `${path.falsePosition}#description`
      },
      {
        name: 'Input Constraints',
        path: `${path.falsePosition}#constraints`
      },
      {
        name: 'Steps to Reproduce',
        path: `${path.falsePosition}#steps`
      },
      {
        name: 'Examples',
        path: `${path.falsePosition}#examples`
      },
      {
        name: 'Calculate',
        path: `${path.falsePosition}#calculate`
      }
    ]
  },
  {
    name: 'Fixed Point Iteration',
    path: path.fixedPointIteration,
    components: [
      {
        name: 'Description',
        path: `${path.fixedPointIteration}#description`
      },
      {
        name: 'Input Constraints',
        path: `${path.fixedPointIteration}#constraints`
      },
      {
        name: 'Steps to Reproduce',
        path: `${path.fixedPointIteration}#steps`
      },
      {
        name: 'Examples',
        path: `${path.fixedPointIteration}#examples`
      },
      {
        name: 'Calculate',
        path: `${path.fixedPointIteration}#calculate`
      }
    ]
  },
  {
    name: 'Newton\'s',
    path: '/docs/newton',
    components: []
  },
  {
    name: 'Secant',
    path: '/docs/secant',
    components: []
  },
  {
    name: 'Gauss Seidel',
    path: '/docs/gauss-seidel',
    components: []
  }
]

export const secondSemesterPages: Array<Page> = [
  {
    name: 'Jacobi',
    path: '/docs/jacobi',
    components: []
  },
  {
    name: 'Newton\'s Divided Difference',
    path: '/docs/divided-difference',
    components: []
  },
  {
    name: 'Newton\'s Forward Difference',
    path: '/docs/forward-difference',
    components: []
  },
  {
    name: 'Newton\'s Backward Difference',
    path: '/docs/backward-difference',
    components: []
  },
  {
    name: 'Lagrange Polynomial',
    path: '/docs/lagrange',
    components: []
  },
  {
    name: 'Regression Equation',
    path: '/docs/regression',
    components: []
  },
  {
    name: 'Trapezoidal Rule',
    path: '/docs/trapezoidal',
    components: []
  },
  {
    name: 'Simpson\'s 1/3 Rule',
    path: '/docs/simpsons-one-third',
    components: []
  },
  {
    name: 'Simpson\'s 3/8 Rule',
    path: '/simpsons-three-eights',
    components: []
  },
  {
    name: 'Romberg\'s',
    path: '/docs/romberg',
    components: []
  },
  {
    name: 'Euler\'s',
    path: '/docs/euler',
    components: []
  }
]

export const miscellaneousPages: Array<Page> = [
  {
    name: 'About',
    path: '/about',
    components: []
  },
  {
    name: 'Sources',
    path: '/sources',
    components: []
  }
]
