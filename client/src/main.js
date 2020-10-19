import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Vuetify from 'vuetify'
// import Modal from './plugins.js'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// main.js

import store from './store'

Vue.use(BootstrapVue)
Vue.use(Vuetify)
// Vue.use(Modal)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
