import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import Config from './storeConfig'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    ...Config
  },
  getters
})

export default store
