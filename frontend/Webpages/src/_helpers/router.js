import Vue from 'vue';
import Router from 'vue-router';
import vuetify from '../plugins/vuetify';

import HomePage from '../home/HomePage';
import LoginPage from '../login/LoginPage';
import RegisterPage from '../register/RegisterPage';
import StudentView from '../student/StudentView';
import StudentAddClassPage from '../student/StudentAddClassPage';
import StudentEditCompleted from '../student/StudentEditCompleted';
import UserPage from '../login/UserPage';
import MessagePage from '../conversation/MessagePage';
import ClassList from '../classes/ClassList'
import AdvisorView from '../advisor/AdvisorView';
import CreateCourse from '../advisor/CreateCourse';

Vue.use(Router);
Vue.use(vuetify);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/studentview', component: StudentView },
    { path: '/user', component: UserPage },
    { path: '/messages', component: MessagePage},
    { path: '/studentaddclass', component: StudentAddClassPage },
    { path: '/classlist', component: ClassList},
    { path: '/editcompleted', component: StudentEditCompleted},
    { path: '/advisorview', component: AdvisorView},
    { path: '/createcourse', component: CreateCourse},

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register', '/user'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})