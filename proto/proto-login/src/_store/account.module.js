/**
  * builds the 'account' constant that is exported
  * imports 'userService' constant exported from the 'user.service.js' file in the '../_services' folder, exported by the 'index.js' file in the same folder
  * imports 'router' constant exported from the 'router.js' file in the '../_helpers' folder, exported by the 'index.js' file in the same folder
  */
import { userService } from '../_services';
import { router } from '../_helpers';

//gets the account 'user' information by parsing JSON data for the 'user'
const user = JSON.parse(localStorage.getItem('user'));
//sets the user state based upon the user's status
const state = user
    ? { status: { loggedIn: true }, user }  //Logged in? Here is the user state
    : { status: {}, user: null };           //Not logged in? The user state is null

//sets the user actions of the account
const actions = {
    //login action (email and password = correct? login is successful, here is the user. email & password != correct? login fails)
    login({ dispatch, commit }, { email, password }) {
        commit('loginRequest', { email });
    
        userService.login(email, password)
            .then(
                user => {
                    commit('loginSuccess', user);
                    router.push('/');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    //logs user out
    logout({ commit }) {
        userService.logout();
        commit('logout');
    },
    //register this as a new user as long as the register is successful
    register({ dispatch, commit }, user) {
        commit('registerRequest', user);
    
        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
                    router.push('/login');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', { root: true });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    }
};

//sets the user mutations in the account
const mutations = {
    //login request process
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    //login successful process
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    //login failure process
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    //logout process
    logout(state) {
        state.status = {};
        state.user = null;
    },
    //register request process
    registerRequest(state, user) {
        state.status = { registering: true };
    },
    //register success process
    registerSuccess(state, user) {
        state.status = {};
    },
    //register failure process
    registerFailure(state, error) {
        state.status = {};
    }
};

//exports the constant 'account' that holds all of the user's information (state, actions, & mutations)
export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};
