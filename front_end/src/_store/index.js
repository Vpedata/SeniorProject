/**
  * index file for './_store' folder
  * imports Vue and Vuex libraries
  */
import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './alert.module';       //imports constant 'alert' vue data exported from 'alert.module.js' file in this folder
import { account } from './account.module';   //imports constant 'account' vue data exported from 'account.module.js' file in this folder
import { users } from './users.module';       //imports constant 'users' vue data exported from 'users.module.js' file in this folder

//Sets Vue to use Vuex library
Vue.use(Vuex);

//exports the constant vue data from alert, account, and users into 'store' as a new Vuex.Store() instance
export const store = new Vuex.Store({
    modules: {
        alert,
        account,
        users
    }
});
