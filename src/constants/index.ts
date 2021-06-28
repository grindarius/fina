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
        name: 'Calculate',
        path: '/docs/significant-digits#calculate'
      }
    ]
  },
  {
    name: 'Decimal Points',
    path: '/docs/decimal-points',
    components: []
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
    components: []
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
