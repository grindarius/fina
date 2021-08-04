import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import * as Pages from '../views'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Pages.Home
  },
  {
    path: '/about',
    name: 'About',
    component: Pages.About
  },
  {
    path: '/sources',
    name: 'Sources',
    component: Pages.Sources
  },
  {
    path: '/docs',
    component: Pages.Docs,
    children: [
      {
        path: '',
        name: 'Getting Started',
        component: Pages.GettingStarted
      },
      {
        path: 'significant-digits',
        name: 'Significant Digits',
        component: Pages.SignificantDigits
      },
      {
        path: 'decimal-points',
        name: 'Decimal Points',
        component: Pages.DecimalPoints
      },
      {
        path: 'bisection',
        name: 'Bisection Method',
        component: Pages.Bisection
      },
      {
        path: 'bisection/calculate',
        name: 'Calculate Bisection',
        component: Pages.CalculateBisection
      },
      {
        path: 'false-position',
        name: 'False Position Method',
        component: Pages.FalsePosition
      },
      {
        path: 'false-position/calculate',
        name: 'Calculate False Position',
        component: Pages.CalculateFalsePosition
      },
      {
        path: 'fixed-point-iteration',
        name: 'Fixed Point Iteration',
        component: Pages.FixedPointIteration
      },
      {
        path: 'fixed-point-iteration/calculate',
        name: 'Calculate Fixed Point Iteration',
        component: Pages.CalculateFixedPointIteration
      },
      {
        path: 'newton',
        name: 'Newton',
        component: Pages.Newton
      },
      {
        path: 'newton/calculate',
        name: 'Calculate Newton',
        component: Pages.CalculateNewton
      },
      {
        path: 'secant',
        name: 'Secant',
        component: Pages.Secant
      },
      {
        path: 'secant/calculate',
        name: 'Calculate Secant'
      }
    ]
  },
  {
    path: '/missing-querystring',
    name: 'Missing Querystring',
    component: Pages.MissingQuerystring
  },
  {
    path: '*',
    name: 'Not Found',
    component: Pages.NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to) {
    if (to.hash != null && to.hash !== '') {
      return { selector: to.hash }
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
