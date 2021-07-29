import { Page } from '@/types'

export const firstSemesterPages: Array<Page> = [
  {
    name: 'Getting started',
    path: '/docs',
    components: [
      {
        name: 'What is FINA',
        path: '/docs#what-is-fina'
      },
      {
        name: 'Features',
        path: '/docs#features'
      }
    ]
  },
  {
    name: 'Significant Digits',
    path: '/docs/significant-digits',
    components: [
      {
        name: 'Description',
        path: '/docs/significant-digits#description'
      },
      {
        name: 'Rules',
        path: '/docs/significant-digits#rules'
      },
      {
        name: 'Examples',
        path: '/docs/significant-digits#examples'
      },
      {
        name: 'Calculate Significant Digits in a number',
        path: '/docs/significant-digits#calculate-sd-in-number'
      },
      {
        name: 'Rounding a number to a desired Significant Digits',
        path: '/docs/significant-digits#round-to-sd'
      },
      {
        name: 'Rules',
        path: '/docs/significant-digits#round-to-sd-rules'
      },
      {
        name: 'Examples',
        path: '/docs/significant-digits#round-to-sd-examples'
      },
      {
        name: 'Round a number to a desired Significant Digits',
        path: '/docs/significant-digits#calculate-round-to-sd'
      }
    ]
  },
  {
    name: 'Decimal Points',
    path: '/docs/decimal-points',
    components: [
      {
        name: 'Description',
        path: '/docs/decimal-points#description'
      },
      {
        name: 'Examples',
        path: '/docs/decimal-points#examples'
      },
      {
        name: 'Round to decimal points',
        path: '/docs/decimal-points#round-to-dp'
      }
    ]
  },
  {
    name: 'Bisection',
    path: '/docs/bisection',
    components: [
      {
        name: 'Description',
        path: '/docs/bisection#description'
      },
      {
        name: 'Input Constraints',
        path: '/docs/bisection#constraints'
      },
      {
        name: 'Steps to Reproduce',
        path: '/docs/bisection#steps'
      },
      {
        name: 'Examples',
        path: '/docs/bisection#examples'
      },
      {
        name: 'Calculate',
        path: '/docs/bisection#calculate'
      }
    ]
  },
  {
    name: 'False Position',
    path: '/docs/false-position',
    components: [
      {
        name: 'Desription',
        path: '/docs/false-position#description'
      },
      {
        name: 'Input Constraints',
        path: '/docs/false-position#constraints'
      },
      {
        name: 'Steps to Reproduce',
        path: '/docs/false-position#steps'
      },
      {
        name: 'Examples',
        path: '/docs/false-position#examples'
      },
      {
        name: 'Calculate',
        path: '/docs/false-position#calculate'
      }
    ]
  },
  {
    name: 'Fixed Point Iteration',
    path: '/docs/fixed-point-iteration',
    components: []
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
