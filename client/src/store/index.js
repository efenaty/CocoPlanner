// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

import { Api } from '@/Api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: []
  },
  getters: {},
  mutations: {
    setItems(state, payload) {
      state.items = payload
    }
  },
  actions: {
    getItems({ state, commit }, id) {
      Api.get(`/lists/${id}/items`)
        .then(response => {
          console.log(response.data)
          commit('setItems', response.data)
        })
        .catch(error => {
          this.message = error.message
          console.error(error)
          commit('setItems', [])
        // TODO: display error message
        })
        .then(() => {
        //   This code is always executed at the end. After success or failure.
          this.$router.push('/favorites/items')
        })
    }

  }
})
