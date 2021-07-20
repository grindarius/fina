import Vue from 'vue'
import Vuex from 'vuex'

import { defaultLocale } from '@/i18n'
import { Locales } from '@/i18n/locales'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    language: defaultLocale
  },
  mutations: {
    setLanguage: (state, payload: Locales) => {
      state.language = payload
    }
  },
  actions: {},
  modules: {}
})
