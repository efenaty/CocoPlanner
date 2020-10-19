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
    // items: [],
    id: ''
  },
  getters: {},
  mutations: {
    setItems(state, payload) {
      state.items = payload
    },
    setId(state, payload) {
      state.id = payload
    }
  },
  actions: {
    getid({ state, commit }, id) {
      // localStorage.removeItem('id')
      // localStorage.setItem('id', id)
      // console.log(id)
      commit('setId', id)
      router.push('/favorites/items')
    }
    // getnewItems({ state, commit }, id) {
    //   // localStorage.removeItem('id')
    //   // localStorage.setItem('id', id)
    //   console.log(id)
    //   Api.get(`/lists/${id}/items`)
    //     .then(response => {
    //       console.log(response.data)
    //       commit('setItems', response.data)
    //       commit('setId', id)
    //       // router.push('/favorites/items')
    //     })
    //     .catch(error => {
    //       this.message = error.message
    //       console.error(error)
    //       commit('setItems', [])
    //     // TODO: display error message
    //     })
    //     .then(() => {
    //       // commit('setId', id)
    //     //   This code is always executed at the end. After success or failure.
    //     })
    // },

    // addItems({ state, commit }, { sid, form }) {
    //   console.log()
    //   // var id = this.id
    //   Api.post(`/lists/${sid}/items`, form)
    //     .then((result) => {
    //       console.log(result)
    //       console.log(form)
    //     }).catch(error => {
    //       console.error(error)
    //     // TODO: display error message
    //     })
    //     .then(() => {
    //       //   This code is always executed at the end. After success or failure.
    //     })
    // e.preventDefault()
    // }

  }
})
