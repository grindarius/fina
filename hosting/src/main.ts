import Buefy from 'buefy'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueKatex from 'vue-katex'
import VueMeta from 'vue-meta'

import App from './App.vue'
import { defaultLocale, messages } from './i18n'
import router from './router'
import store from './store'

import '@mdi/font/css/materialdesignicons.css'
import './globals.scss'
import 'katex/dist/katex.min.css'

Vue.config.productionTip = false

Vue.use(Buefy)
Vue.use(VueI18n)
Vue.use(VueKatex)
Vue.use(VueMeta)

export const i18n = new VueI18n({
  messages,
  locale: defaultLocale,
  fallbackLocale: defaultLocale
})

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
