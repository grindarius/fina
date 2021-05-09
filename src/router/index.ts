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
    path: '/significant-digits',
    name: 'Significant Digits',
    component: Pages.SignificantDigits
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
