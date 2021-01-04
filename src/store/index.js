import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import channels from './modules/channels.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    channels
  },
  getters: {
    token (state) {
      return state.user.tokenInfo.token
    }
  }
})

export default store
