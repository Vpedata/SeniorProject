import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/login/LoginPage'
import Student from '@/login/UserPage'
import axios from 'axios'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/fe/student',
      name: 'Student',
      component: Student,
      meta: {
          requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)){
      axios.get("http://onlineadvisor.tk:3000/user/getmyid")
      .then ((result =>{
          next();
      }))
    }
})

export default router;