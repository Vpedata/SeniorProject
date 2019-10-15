/**
  * Alert module data
  */

//constant alert 'state' that defaults to null for alert type and message
const state = {
    type: null,
    message: null
};

//constant alert 'actions' that holds success, error, and clear alert actions
const actions = {
    success({ commit }, message) {
        commit('success', message);
    },
    error({ commit }, message) {
        commit('error', message);
    },
    clear({ commit }, message) {
        commit('success', message);
    }
};

//constant alert 'mutations' that hold success, error, and clear mutations
const mutations = {
    success(state, message) {
        state.type = 'alert-success';
        state.message = message;
    },
    error(state, message) {
        state.type = 'alert-danger';
        state.message = message;
    },
    clear(state) {
        state.type = null;
        state.message = null;
    }
};

//exports constant 'alert' that holds all of the data from state, actions, & mutations
export const alert = {
    namespaced: true,
    state,
    actions,
    mutations
};
