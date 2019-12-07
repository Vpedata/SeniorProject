import Vue from 'vue'
import Vuetify from 'vuetify'
import Router from 'vue-router'
import ClassList from '@/studentpages/ClassList'
import ClassListAdvisor from '@/advisor/ClassListAdvisor'
import StudentAddClassPage from '@/studentpages/StudentAddClassPage'
import StudentView from '@/studentpages/StudentView'
import StudentEditCompleted from '@/studentpages/StudentEditCompleted'
import Login from '@/login/LoginPage'
import AdvisorView from '@/advisor/AdvisorView'
import CreateCourse from '@/advisor/CreateCourse'
import AdvisorSemesterView from '@/advisor/AdvisorSemesterView'
import Chat from '@/advisor/Chat'
import StudentChat from '@/studentpages/StudentChat'
import axios from 'axios'
//import Messages from '@/messaging/components/ChatApp'

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
      name: 'StudentView',
      component: StudentView,
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
      path: '/fe/classlistadvisor',
      name: 'ClassListAdvisor',
      component: ClassListAdvisor,
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
      path: '/fe/messages',
      name: 'StudentChat',
      component: StudentChat,
      meta: {
        requiresAuth: true
      }
    },
    { 
      path: '/fe/adv/messages',
      name: 'Chat',
      component: Chat,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/fe/editcompleted',
      name: 'StudentEditCompleted',
      component: StudentEditCompleted,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/fe/adv/advisor',
      name: 'AdvisorView',
      component: AdvisorView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/fe/adv/createcourse',
      name: 'CreateCourse',
      component: CreateCourse,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/fe/adv/semesterView',
      name: 'AdvisorSemesterView',
      component: AdvisorSemesterView,
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
        else if ((to.path.includes("/adv/") && result.data.isStudent == 0) || to.path.includes("/classlist")){
          next();
        }
        else if (!(to.path.includes("/adv/")) && result.data.isStudent == 1){
          next();
        }
      })
  }
  else{
    next();
  }
})

export default router;
