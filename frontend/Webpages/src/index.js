/**
  * JavaScript index file for main page
  * imports Vue for vue.js implementation
  * imports VeeValidate for validation
  */
import Vue from 'vue';
import VeeValidate from 'vee-validate';

import { store } from './_store'; //imports the constant 'store' vue data exported from index.js in the './_store' folder
import { router } from './_helpers'; //imports the constant 'router' vue data exported from router.js which is exported from index.js in the './_helpers' folder
import App from './app/App'; //imports the 'default' app vue data exported by the App.vue file in the './app' folder

//Vue is set up to use the VeeValidate library for Vue to simplify validation 
Vue.use(VeeValidate);

// setup fake backend
import { configureFakeBackend } from './_helpers'; //imports the configureFakeBackend() function exported from 'fake-backend.js' which is exported by 'index.js' in the './_helpers' folder
configureFakeBackend();

//Creates a Vue instance implementation for page elements tagged as 'app' (like the div tagged 'app' in index.html)
//Also passes router, store, and render data (set up by the App vue data in the App.vue file in the './app' folder) to any elements tagged as 'app'
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
