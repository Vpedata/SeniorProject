import Vue from 'vue'
import Vuetify from 'vuetify'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ClassList from '@/studentpages/ClassList'
import StudentAddClassPage from '@/studentpages/StudentAddClassPage'
import StudentView from '@/studentpages/StudentView'
import Login from '@/login/LoginPage'
import Student from '@/login/UserPage'
import axios from 'axios'

Vue.use(Router)
Vue.use(Vuetify)

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
    },
    {
      path: '/fe/classlist',
      name: 'ClassList',
      component: ClassList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/fe/studentaddclasspage',
      name: 'StudentAddClassPage',
      component: StudentAddClassPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/fe/studentview',
      name: 'StudentView',
      component: StudentView,
      meta: {
        requiresAuth: true
      }
    },

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
