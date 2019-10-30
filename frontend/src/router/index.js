import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/login/LoginPage'
import Student from '@/login/UserPage'
import axios from 'axios'

Vue.use(Router)

let router = new Router({
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

router.beforeEach((to, from, next) =>{
  if (to.matched.some(record => record.meta.requiresAuth)){
      axios.get("/user/check")
      .then(function(result){
        if (result.data.redirect == "yes"){
          router.replace("/");
        }
        else{
          next();
        }
      })
  }
  else{
    next();
  }
})

export default router;
