import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/login/LoginPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
