import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Calendar from './views/Calendar.vue'
import Tasks from './views/Tasks.vue'
import Favorites from './views/Favorites.vue'
import Signup from './views/Signup.vue'
import Account from './views/Account.vue'
import Login from './views/Login.vue'
import Items from './views/Items.vue'
import NotFound from './views/NotFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/favorites/items',
      name: 'items',
      component: Items
    },
    {
      // Source : https://techformist.com/create-404-pages-vue-app/
      path: '*',
      name: 'notFound',
      component: NotFound
    }
  ]
})
