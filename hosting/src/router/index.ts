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
        path: 'calculate-bisection',
        name: 'Calculate Bisection',
        component: Pages.CalculateBisection
      },
      {
        path: 'false-position',
        name: 'False Position Method',
        component: Pages.FalsePosition
      },
      {
        path: 'calculate-false-position',
        name: 'Calculate False Position',
        component: Pages.CalculateFalsePosition
      },
      {
        path: 'missing-querystring',
        name: 'Missing Querystring',
        component: Pages.MissingQuerystring
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
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
