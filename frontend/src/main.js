// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import classComponent from './studentpages/classListComponent.vue'
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import chat from './advisor/Chat'

Vue.use(chat);
Vue.use(Autocomplete);
Vue.use(Vuetify, {
  iconfont: 'mdi'
})

Vue.config.productionTip = false
Vue.prototype.$http = axios


/* eslint-disable no-new */
new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data () {
    return {
      dialog: false
    }
  },
  router,
  components: { App, classComponent },
  template: '<App/>'
})
