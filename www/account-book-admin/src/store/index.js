import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import categories from './modules/categories'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    categories
  },
  getters
})

export default store
