// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
// import { Api } from '@/Api'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })],
  state: {
    id: ''
  },
  getters: {},
  mutations: {
    setId(state, payload) {
      state.id = payload
    }
  },
  actions: {
    getid({ state, commit }, id) {
      commit('setId', id)
      router.push('/favorites/items')
    }

  }
})
